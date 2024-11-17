require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectWithDB = require("./config/db");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary").v2;
const adminRoutes = require("./routes/admin");
//const App = require("../client/src/App").default;

// Connexion à la base de données
connectWithDB();

// Configuration de Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

// Gestion des cookies
app.use(cookieParser());

// Configuration unique de CORS
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Initialisation de cookie-session middleware
app.use(
  cookieSession({
    name: "session",
    maxAge: process.env.COOKIE_TIME * 24 * 60 * 60 * 1000,
    keys: [process.env.SESSION_SECRET],
    secure: true,
    sameSite: "none",
    httpOnly: true,
  })
);

// Middleware pour traiter le JSON
app.use(express.json());

// Utilisation des routes API
app.use("/api/users", require("./routes/user"));
app.use("/api/admin", adminRoutes);
app.use("/api/places", require("./routes/place"));

// Route de base
app.use("/", require("./routes"));

// Lancement du serveur
app.listen(process.env.PORT || 8000, (err) => {
  if (err) {
    console.log("Erreur lors de la connexion au serveur: ", err);
  }
  console.log(`Le serveur fonctionne sur le port ${process.env.PORT}`);
});

module.exports = app;

// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const path = require("path");
// const connectWithDB = require("./config/db");
// const cookieSession = require("cookie-session");
// const cookieParser = require("cookie-parser");
// const cloudinary = require("cloudinary").v2;
// const adminRoutes = require("./routes/admin");
// const React = require("react");
// const ReactDOMServer = require("react-dom/server");
// const { StaticRouter } = require("react-router-dom/server");
// const { ChunkExtractor, ChunkExtractorManager } = require("@loadable/server");
// const App = require("../src/App").default;

// // Connexion à la base de données
// connectWithDB();

// // Configuration de Cloudinary
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// const app = express();

// // Gestion des cookies
// app.use(cookieParser());

// // Configuration unique de CORS
// app.use(
//   cors({
//     origin: process.env.CLIENT_URL,
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );

// // Initialisation de cookie-session middleware
// app.use(
//   cookieSession({
//     name: "session",
//     maxAge: process.env.COOKIE_TIME * 24 * 60 * 60 * 1000,
//     keys: [process.env.SESSION_SECRET],
//     secure: true,
//     sameSite: "none",
//     httpOnly: true,
//   })
// );

// // Middleware pour traiter le JSON
// app.use(express.json());

// // Servir les fichiers statiques
// app.use(express.static(path.resolve(__dirname, "../build")));

// // Utilisation des routes API
// app.use("/api/users", require("./routes/user"));
// app.use("/api/admin", adminRoutes);
// app.use("/api/places", require("./routes/place"));

// // Configuration SSR
// const statsFile = path.resolve(__dirname, "../build/loadable-stats.json");
// const extractor = new ChunkExtractor({ statsFile });

// app.get("*", (req, res, next) => {
//   // Vérifier si la route est une route API
//   if (req.url.startsWith("/api")) {
//     return next();
//   }

//   const context = {};
//   const jsx = extractor.collectChunks(
//     <StaticRouter location={req.url} context={context}>
//       <App />
//     </StaticRouter>
//   );

//   const { pipe, abort } = ReactDOMServer.renderToPipeableStream(jsx, {
//     bootstrapScripts: extractor.getMainAssets().map((asset) => asset.url),
//     onShellReady() {
//       res.statusCode = 200;
//       res.setHeader("Content-type", "text/html");
//       res.write(`<!DOCTYPE html>
//         <html>
//           <head>
//             <meta charset="utf-8">
//             <title>Mon Application MERN</title>
//             ${extractor.getLinkTags()}
//             ${extractor.getStyleTags()}
//           </head>
//           <body>
//             <div id="root">`);
//       pipe(res);
//       res.write(`</div>
//             ${extractor.getScriptTags()}
//           </body>
//         </html>`);
//     },
//     onShellError(error) {
//       console.error("Erreur de rendu Shell:", error);
//       res.statusCode = 500;
//       res.send("<!doctype html><p>Erreur de chargement</p>");
//     },
//     onError(error) {
//       console.error("Erreur de rendu:", error);
//       res.statusCode = 500;
//       res.send("<!doctype html><p>Erreur de rendu</p>");
//     },
//   });

//   setTimeout(abort, 10000);
// });

// // Lancement du serveur
// app.listen(process.env.PORT || 8000, (err) => {
//   if (err) {
//     console.log("Erreur lors de la connexion au serveur: ", err);
//   }
//   console.log(`Le serveur fonctionne sur le port ${process.env.PORT}`);
// });

// module.exports = app;
