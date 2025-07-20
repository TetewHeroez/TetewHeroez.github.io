// scripts/fetch-data.js
import fetch from "node-fetch";
import fs from "fs";
import "dotenv/config"; // Memuat variabel dari .env

const GITHUB_USERNAME = "TetewHeroez"; // Ganti dengan username GitHub Anda
const GITHUB_TOKEN = process.env.VITE_GITHUB_TOKEN;

// --- FUNGSI UNTUK MEMBANGUN STRUKTUR POHON (TIDAK BERUBAH) ---
const buildFileTree = (nodes) => {
  if (!Array.isArray(nodes)) {
    return {};
  }
  const root = {};

  nodes.forEach((node) => {
    let currentNode = root;
    const parts = node.path.split("/");

    parts.forEach((part, index) => {
      const isLastPart = index === parts.length - 1;

      if (!currentNode[part]) {
        const type = isLastPart
          ? node.type === "tree"
            ? "folder"
            : "file"
          : "folder";

        if (type === "folder") {
          currentNode[part] = { type: "folder", children: {} };
        } else {
          currentNode[part] = { type: "file" };
        }
      }

      if (currentNode[part].type === "folder") {
        currentNode = currentNode[part].children;
      }
    });
  });

  return root;
};

// --- FUNGSI HELPER API (TIDAK BERUBAH) ---
async function fetchGitHubAPI(endpoint) {
  const response = await fetch(`https://api.github.com${endpoint}`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
    },
  });
  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Failed to fetch ${endpoint}: ${response.statusText} - ${errorBody}`
    );
  }
  return response.json();
}

// --- FUNGSI GET REPO TREE (TIDAK BERUBAH) ---
async function getRepoTreeData(owner, repoName) {
  const treeData = await fetchGitHubAPI(
    `/repos/${owner}/${repoName}/git/trees/main?recursive=1`
  );

  if (treeData.truncated) {
    console.warn(
      `Warning: File tree for repo ${repoName} is truncated because it has too many files.`
    );
  }
  return treeData.tree;
}

// --- FUNGSI UTAMA (DIMODIFIKASI) ---
async function getGitHubData() {
  try {
    console.log("Fetching GitHub profile and repositories...");

    const [profile, initialRepos] = await Promise.all([
      fetchGitHubAPI(`/users/${GITHUB_USERNAME}`),
      fetchGitHubAPI(
        `/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=10`
      ),
    ]);

    console.log("Profile and repo list fetched successfully!");

    const reposToExclude = [GITHUB_USERNAME, `${GITHUB_USERNAME}.github.io`];
    console.log(
      `Filtering out the following repos: ${reposToExclude.join(", ")}`
    );
    const filteredRepos = initialRepos.filter(
      (repo) => !reposToExclude.includes(repo.name)
    );
    console.log(
      `${filteredRepos.length} repositories remaining after filtering.`
    );

    console.log(
      "Now fetching file tree and language data for each remaining repository..."
    );

    const reposWithTree = await Promise.all(
      filteredRepos.map(async (repo) => {
        try {
          // --- PERUBAHAN DIMULAI DI SINI ---

          // 1. Ambil data tree DAN data bahasa secara paralel untuk efisiensi
          const [treeNodes, languagesData] = await Promise.all([
            getRepoTreeData(GITHUB_USERNAME, repo.name),
            fetchGitHubAPI(`/repos/${GITHUB_USERNAME}/${repo.name}/languages`), // Panggilan API baru
          ]);

          // 2. Ubah array node tree menjadi objek bersarang
          const nestedTree = buildFileTree(treeNodes);

          return {
            name: repo.name,
            description: repo.description,
            url: repo.html_url,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            // 3. Simpan objek bahasa, bukan string tunggal
            //    Properti 'language' diganti menjadi 'languages'
            languages: languagesData,
            tree: nestedTree,
          };

          // --- AKHIR PERUBAHAN ---
        } catch (error) {
          console.error(
            `Could not fetch data for ${repo.name}. Skipping. Reason: ${error.message}`
          );
          // Jika gagal, tetap kembalikan data dasar dengan tree dan languages kosong
          return {
            name: repo.name,
            description: repo.description,
            url: repo.html_url,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            languages: {}, // Kembalikan objek kosong
            tree: {}, // Kembalikan objek kosong
          };
        }
      })
    );

    console.log("All data fetched!");

    const data = {
      profile: {
        name: profile.name,
        avatar_url: profile.avatar_url,
        bio: profile.bio,
        followers: profile.followers,
        following: profile.following,
      },
      repos: reposWithTree,
    };

    fs.writeFileSync("public/data.json", JSON.stringify(data, null, 2));
    console.log(
      "✅ data.json has been created with language objects and nested tree objects."
    );
  } catch (error) {
    console.error("Error during GitHub data fetch process:", error);
  }
}

getGitHubData();
