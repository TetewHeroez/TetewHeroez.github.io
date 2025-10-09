// scripts/transform-data.js
import fs from "fs";
import path from "path";

// Helper function untuk memastikan direktori ada
const ensureDirectoryExistence = (filePath) => {
  const dirname = path.dirname(filePath);
  if (fs.existsSync(dirname)) return true;
  ensureDirectoryExistence(dirname);
  fs.mkdirSync(dirname);
};

// --- PARSER HELPER (Tidak Berubah) ---
const parseImagesFromReadme = (readme) => {
  if (!readme) return [];
  const imageUrls = [];
  const regex = /!\[.*?\]\((.*?)\)|<img.*?src=["'](.*?)["']/g;
  let match;
  while ((match = regex.exec(readme)) !== null) {
    if (match[1]) imageUrls.push(match[1]);
    if (match[2]) imageUrls.push(match[2]);
  }
  return imageUrls;
};

const parseSectionFromReadme = (readme, sectionName) => {
  if (!readme) return null;
  // Menambahkan flag 'g' (global) untuk menemukan semua kecocokan, bukan hanya yang pertama.
  const regex = new RegExp(
    `<!--\\s*PORTFOLIO-START:\\s*${sectionName}\\s*-->([\\s\\S]*?)<!--\\s*PORTFOLIO-END:\\s*${sectionName}\\s*-->`,
    "gm"
  );

  const parts = [];
  let match;

  // Loop melalui semua blok yang cocok yang ditemukan oleh regex
  while ((match = regex.exec(readme)) !== null) {
    // match[1] berisi konten yang ditangkap di antara tag
    parts.push(match[1].trim());
  }

  // Jika ada bagian yang ditemukan, gabungkan dengan jeda paragraf.
  return parts.length > 0 ? parts.join("\n\n") : null;
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

  const tagMetadataMap = {
    store: "store",
    game: "gamepad",
    gamepad: "gamepad",
    calculator: "calculator",
    account: "account",
    web: "web",
    school: "school",
    book: "book",
    lock: "lock",
    document: "document",
    heart: "heart",
    cart: "cart",
    chat: "chat",
    send: "send",
    dashboard: "dashboard",
    brain: "brain",
    default: "user",
  };

  return githubApiData
    .filter((repo) => repo !== null && repo !== undefined) // Filter null values
    .sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0))
    .map((repo, index) => {
      const readme = repo.readmeContent || "";

      const images = parseImagesFromReadme(readme);
      let detailedDescription = parseSectionFromReadme(
        readme,
        "detailedDescription"
      );
      const featuresText = parseSectionFromReadme(readme, "features");

      const features = featuresText
        ? featuresText
            .split("\n")
            .map((line) => {
              const match = line.match(/\*\*(.*?)\*\*/);
              return match ? match[1].trim() : null;
            })
            .filter(Boolean)
        : [];

      if (detailedDescription) {
        detailedDescription = detailedDescription.replace(/\*\*/g, "");
      }

      const repoTopics = repo.topics || [];
      let category = "personal";
      const foundCategory = validCategories.find((cat) =>
        repoTopics.includes(`${cat}`)
      );
      if (foundCategory) category = foundCategory;

      const portfolioCategoryTopics = validCategories.map((c) => `${c}`);
      const tagsToRemove = [...validCategories, ...portfolioCategoryTopics];
      const finalTags = repoTopics.filter((t) => !tagsToRemove.includes(t));

      let iconKey = tagMetadataMap.default;
      for (const tag of finalTags) {
        if (tagMetadataMap[tag]) {
          iconKey = tagMetadataMap[tag];
          break;
        }
      }

      return {
        id: index + 1,
        title: repo.name
          .replace(/-/g, " ")
          .replace(/\b\w/g, (l) => l.toUpperCase()),
        description: repo.description || "No description provided.",
        detailedDescription:
          detailedDescription ||
          repo.description ||
          "For more details, please see the repository's README.",
        features: features,
        images:
          images.length > 0
            ? images
            : [`https://placehold.co/600x400/cccccc/000000?text=${repo.name}`],
        category: category,
        tags: finalTags,
        link: repo.html_url,
        github: repo.html_url,
        homepage: repo.homepage,
        icon: iconKey,
      };
    });
};

// --- FUNGSI UTAMA (Tidak Berubah) ---
function runTransform() {
  try {
    console.log("Reading raw data from public/raw-data.json...");
    const rawDataPath = path.join(process.cwd(), "public/raw-data.json");
    const rawDataContent = fs.readFileSync(rawDataPath, "utf-8");
    const rawData = JSON.parse(rawDataContent);

    if (!rawData.repos)
      throw new Error("'repos' key not found in raw-data.json");

    console.log("Transforming data using README content...");
    const projectsData = transformApiDataToProjects(rawData.repos);

    const outputPath = path.join(process.cwd(), "public/projects-data.json");
    ensureDirectoryExistence(outputPath);
    fs.writeFileSync(outputPath, JSON.stringify(projectsData, null, 2));

    console.log("✅ projects-data.json has been created successfully!");
  } catch (error) {
    console.error("Error during data transformation process:", error);
    process.exit(1);
  }
}

runTransform();
