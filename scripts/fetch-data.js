// scripts/fetch-data.js
import fetch from "node-fetch";
import fs from "fs";
import "dotenv/config"; // Memuat variabel dari .env

console.log("🔧 Environment check:");
console.log("GITHUB_USERNAME:", process.env.GITHUB_USERNAME || "❌ Not found");
console.log(
  "GITHUB_TOKEN length:",
  process.env.GITHUB_TOKEN ? process.env.GITHUB_TOKEN.length : "❌ Not found"
);
console.log(
  "GITHUB_TOKEN preview:",
  process.env.GITHUB_TOKEN
    ? process.env.GITHUB_TOKEN.substring(0, 20) + "..."
    : "❌ Not found"
);

const GITHUB_USERNAME = process.env.GITHUB_USERNAME || "TetewHeroez";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

if (!GITHUB_TOKEN) {
  console.error("❌ GITHUB_TOKEN tidak ditemukan! Cek file .env");
  process.exit(1);
}

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

// --- FUNGSI HELPER API (DITINGKATKAN DENGAN CACHE BUSTING DAN DEBUG) ---
async function fetchGitHubAPI(endpoint) {
  // Debug token
  if (!GITHUB_TOKEN) {
    throw new Error("❌ GITHUB_TOKEN tidak ditemukan! Cek file .env");
  }

  console.log(`🔗 Fetching: ${endpoint}`);

  // Tambahkan cache busting
  const cacheBuster = `${endpoint.includes("?") ? "&" : "?"}_t=${Date.now()}`;
  const fullEndpoint = `${endpoint}${cacheBuster}`;

  const response = await fetch(`https://api.github.com${fullEndpoint}`, {
    headers: {
      Authorization: `token ${GITHUB_TOKEN}`,
      Accept: "application/vnd.github.v3+json",
      "Cache-Control": "no-cache", // Tambahkan header no-cache
    },
  });

  // Debug response
  console.log(`📊 Response status: ${response.status} ${response.statusText}`);
  console.log(
    `🕒 Response headers - Last-Modified: ${response.headers.get(
      "Last-Modified"
    )}`
  );
  console.log(`📝 Response headers - ETag: ${response.headers.get("ETag")}`);

  if (!response.ok) {
    const errorBody = await response.text();
    console.error(`❌ API Error for ${endpoint}:`, {
      status: response.status,
      statusText: response.statusText,
      body: errorBody,
      rateLimitRemaining: response.headers.get("X-RateLimit-Remaining"),
      rateLimitReset: response.headers.get("X-RateLimit-Reset"),
    });
    throw new Error(
      `Failed to fetch ${endpoint}: ${response.statusText} - ${errorBody}`
    );
  }

  const data = await response.json();
  console.log(`✅ Successfully fetched ${endpoint}`);
  return data;
}

// --- FUNGSI GET README DENGAN FALLBACK ---
async function getReadmeContent(owner, repoName) {
  const readmeFiles = [
    "readme",
    "README",
    "Readme",
    "README.md",
    "readme.md",
    "Readme.md",
  ];

  for (const readmeFile of readmeFiles) {
    try {
      console.log(
        `🔗 Trying to fetch: /repos/${owner}/${repoName}/${readmeFile}`
      );
      const readmeData = await fetchGitHubAPI(
        `/repos/${owner}/${repoName}/${readmeFile}`
      );
      if (readmeData && readmeData.content) {
        return Buffer.from(readmeData.content, "base64").toString("utf-8");
      }
    } catch (error) {
      // Continue to next README option
      console.log(`   ❌ ${readmeFile} not found, trying next...`);
    }
  }

  console.log(`   ⚠️ No README found for ${repoName}`);
  return "";
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

// --- FUNGSI CEK TOKEN ---
async function checkGitHubToken() {
  try {
    console.log("🔐 Checking GitHub token...");
    const [userInfo, rateLimit] = await Promise.all([
      fetchGitHubAPI("/user"),
      fetchGitHubAPI("/rate_limit"),
    ]);

    console.log("✅ Token valid!");
    console.log(`👤 Authenticated as: ${userInfo.login}`);
    console.log(
      `📊 Rate limit remaining: ${rateLimit.rate.remaining}/${rateLimit.rate.limit}`
    );
    console.log(
      `⏰ Rate limit resets at: ${new Date(
        rateLimit.rate.reset * 1000
      ).toISOString()}`
    );

    if (rateLimit.rate.remaining < 10) {
      console.warn("⚠️ WARNING: Rate limit hampir habis!");
    }

    return true;
  } catch (error) {
    console.error("❌ Token check failed:", error.message);
    return false;
  }
}

// --- FUNGSI UTAMA (DITINGKATKAN DENGAN LOGGING DAN TOKEN CHECK) ---
async function getGitHubData() {
  // Cek token dulu
  const tokenValid = await checkGitHubToken();
  if (!tokenValid) {
    console.error("💥 Cannot proceed without valid token!");
    throw new Error("Invalid GitHub token");
  }

  try {
    const startTime = new Date();
    console.log("\n📡 Fetching GitHub profile and repositories...");
    console.log(`🕐 Start time: ${startTime.toISOString()}`);

    const [profile, initialRepos] = await Promise.all([
      fetchGitHubAPI(`/users/${GITHUB_USERNAME}`),
      fetchGitHubAPI(
        `/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=10`
      ),
    ]);

    console.log("Profile and repo list fetched successfully!");
    console.log(`📊 Found ${initialRepos.length} repositories total`);

    // Logging untuk melihat repo names dan update time
    console.log("📋 Repository update times:");
    initialRepos.forEach((repo) => {
      console.log(`  • ${repo.name}: ${repo.updated_at}`);
    });

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
          const [treeNodes, languagesData, repoDetails] = await Promise.all([
            getRepoTreeData(GITHUB_USERNAME, repo.name),
            fetchGitHubAPI(`/repos/${GITHUB_USERNAME}/${repo.name}/languages`), // Panggilan API baru
            fetchGitHubAPI(`/repos/${GITHUB_USERNAME}/${repo.name}`), // Untuk 'topics'
          ]);

          // Get README content with fallback options
          const readmeContent = await getReadmeContent(
            GITHUB_USERNAME,
            repo.name
          );
          const nestedTree = buildFileTree(treeNodes);

          return {
            name: repo.name,
            description: repo.description,
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            languages: languagesData,
            html_url: repo.html_url,
            homepage: repoDetails.homepage,
            topics: repoDetails.topics || [],
            languages: languagesData || {},
            readmeContent: readmeContent,
            tree: nestedTree,
          };

          // --- AKHIR PERUBAHAN ---
        } catch (error) {
          console.error(
            `Could not fetch data for ${repo.name}. Skipping. Reason: ${error.message}`
          );
          // Return null instead of undefined so we can filter it out later
          return null;
        }
      })
    );

    console.log("All data fetched!");

    // Filter out null values (failed repos)
    const validRepos = reposWithTree.filter((repo) => repo !== null);
    console.log(
      `📊 Successfully processed ${validRepos.length} out of ${filteredRepos.length} repositories`
    );

    const timestamp = new Date().toISOString();
    const data = {
      fetchedAt: timestamp, // Tambahkan timestamp fetch
      profile: {
        name: profile.name,
        avatar_url: profile.avatar_url,
        bio: profile.bio,
        followers: profile.followers,
        following: profile.following,
      },
      repos: validRepos,
    };

    // Hapus file lama terlebih dahulu jika ada
    if (fs.existsSync("public/raw-data.json")) {
      fs.unlinkSync("public/raw-data.json");
      console.log("🗑️ Old raw-data.json deleted");
    }

    fs.writeFileSync("public/raw-data.json", JSON.stringify(data, null, 2));
    const endTime = new Date();
    const duration = ((endTime - startTime) / 1000).toFixed(2);
    console.log(
      `✅ raw-data.json has been created at ${timestamp} with language objects and nested tree objects.`
    );
    console.log(`⏱️ Total execution time: ${duration} seconds`);
  } catch (error) {
    console.error("Error during GitHub data fetch process:", error);
  }
}

getGitHubData();
