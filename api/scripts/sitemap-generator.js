const { SitemapStream, streamToPromise } = require("sitemap");
const { Readable } = require("stream");
const globPromise = require("glob-promise");
const fs = require("fs");
const path = require("path");

// Objet de configuration
const config = {
  baseUrl: "https://atypikhouse.com",
  // pagesDir: path.resolve(__dirname, "..", "..", "client", "src", "pages"),
  pagesDir: "K:/AtypikHouse-main/client/src/pages",
  outputPath: path.resolve(
    __dirname,
    "..",
    "..",
    "client",
    "public",
    "sitemap.xml"
  ),
  defaultChangefreq: "daily",
  defaultPriority: 0.7,
  homePriority: 1.0,
};

// Fonction pour nettoyer les chemins d'URL
const cleanUrlPath = (filePath) => {
  return filePath
    .replace(config.pagesDir, "")
    .replace(/\.[^/.]+$/, "") // Supprimer l'extension du fichier
    .replace("/index", "/") // Convertir /index en /
    .replace(/\/?$/, "/") // Assurer un slash final
    .toLowerCase();
};

// Fonction pour créer une entrée d'URL
const createUrlEntry = (urlPath) => ({
  url: urlPath,
  changefreq: config.defaultChangefreq,
  priority: urlPath === "/" ? config.homePriority : config.defaultPriority,
  lastmod: new Date().toISOString(),
});

async function generateSitemap() {
  console.log("Chemin du script:", __filename);
  console.log("Dossier des pages:", config.pagesDir);
  console.log("Chemin de sortie:", config.outputPath);
  console.log("Dossier de travail actuel :", process.cwd());

  try {
    // S'assurer que le répertoire public existe
    const publicDir = path.dirname(config.outputPath);
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }

    // Trouver tous les fichiers de composants React
    const files = await globPromise(`${config.pagesDir}/**/*.{jsx,tsx,js,ts}`);

    console.log(`Nombre de fichiers trouvés : ${files.length}`);

    if (files.length === 0) {
      console.warn("Aucune page trouvée dans le répertoire des pages !");
      return;
    }

    // Transformer les chemins de fichiers en URLs
    const links = files
      .map((file) => cleanUrlPath(file))
      .map((urlPath) => createUrlEntry(urlPath));

    // Créer le flux de sitemap
    const stream = new SitemapStream({
      hostname: config.baseUrl,
      xmlns: {
        news: false,
        xhtml: true,
        image: false,
        video: false,
      },
    });

    // Générer le XML du sitemap
    const sitemap = await streamToPromise(
      Readable.from(links).pipe(stream)
    ).then((data) => data.toString());

    console.log("Contenu du sitemap :");
    console.log(sitemap);

    // Écrire le sitemap dans un fichier
    try {
      fs.writeFileSync(config.outputPath, sitemap);
      console.log("Fichier écrit avec succès");
    } catch (error) {
      console.error("Erreur lors de l'écriture du fichier :", error);
    }

    console.log("Vérification de l'existence du fichier :");
    console.log(
      fs.existsSync(config.outputPath)
        ? "Le fichier existe"
        : "Le fichier n'existe pas"
    );

    console.log("Contenu du dossier de sortie :");
    console.log(fs.readdirSync(path.dirname(config.outputPath)));

    console.log(`✅ Sitemap généré avec succès à ${config.outputPath}`);
    console.log(`📊 Total des URLs : ${links.length}`);
  } catch (error) {
    console.error(
      "❌ Erreur lors de la génération du sitemap :",
      error.message
    );
    process.exit(1);
  }
}

// Exécuter le générateur
generateSitemap();
