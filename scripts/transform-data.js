// scripts/transform-data.js
import fs from "fs";
import path from "path";

// Helper function untuk memastikan direktori ada
const ensureDirectoryExistence = (filePath) => {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) {
    return true;
  }
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
};

/**
 * Mengekstrak blok JSON dari komentar metadata di dalam konten README.
 */
const parseMetadataFromReadme = (readme) => {
  if (!readme) return null;
  const regex = /<!--\s*PORTFOLIO-METADATA\s*([\s\S]*?)\s*-->/;
  const match = readme.match(regex);
  if (match && match[1]) {
    try {
      return JSON.parse(match[1]);
    } catch (error) {
      console.error("Gagal mem-parsing JSON dari metadata README:", error);
      return null;
    }
  }
  return null;
};

/**
 * Mengubah data mentah API GitHub menjadi format yang siap digunakan oleh UI.
 */
const transformApiDataToProjects = (githubApiData) => {
  if (!Array.isArray(githubApiData)) {
    console.error("Data API GitHub tidak valid.");
    return [];
  }

  const validCategories = [
    "personal",
    "academic",
    "committee",
    "research",
    "work",
  ];

  return githubApiData
    .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
    .map((repo) => {
      const metadata = parseMetadataFromReadme(repo.readmeContent);
      const repoTopics = repo.topics || [];

      let category = "personal"; // Default category
      let categoryTopic = "";

      for (const cat of validCategories) {
        const potentialTopic = `portfolio-${cat}`;
        if (repoTopics.includes(potentialTopic)) {
          category = cat;
          categoryTopic = potentialTopic;
          break;
        }
      }

      const finalTags = repoTopics.filter((t) => t !== categoryTopic);

      return {
        id: repo.id,
        title: repo.name
          .replace(/-/g, " ")
          .replace(/\b\w/g, (l) => l.toUpperCase()),
        description: repo.description || "No description provided.",
        detailedDescription:
          metadata?.detailedDescription ||
          repo.description ||
          "For more details, please see the repository's README.",
        features: metadata?.features || [],
        icon: metadata?.icon || "⭐",
        images: metadata?.images || [
          `https://placehold.co/600x400/cccccc/000000?text=${repo.name}`,
        ],
        category: category,
        tags: finalTags,
        link: repo.html_url,
        github: repo.html_url,
        gradientColor: metadata?.gradientColor || "from-gray-400 to-gray-500",
      };
    });
};

// --- FUNGSI UTAMA UNTUK MENJALANKAN TRANSFORMASI ---
function runTransform() {
  try {
    console.log("Reading raw data from public/raw-data.json...");
    const rawDataPath = path.join(process.cwd(), "public/raw-data.json");
    const rawDataContent = fs.readFileSync(rawDataPath, "utf-8");
    const rawData = JSON.parse(rawDataContent);

    // Pastikan data yang dibaca adalah array dari repos
    if (!rawData.repos) {
      throw new Error("'repos' key not found in raw-data.json");
    }

    console.log("Transforming data...");
    const projectsData = transformApiDataToProjects(rawData.repos);

    const outputPath = path.join(process.cwd(), "public/projects-data.json");
    ensureDirectoryExistence(outputPath);
    fs.writeFileSync(outputPath, JSON.stringify(projectsData, null, 2));

    console.log("✅ projects-data.json has been created successfully!");
  } catch (error) {
    console.error("Error during data transformation process:", error);
    process.exit(1); // Keluar dengan kode error
  }
}

// Jalankan skrip
runTransform();
