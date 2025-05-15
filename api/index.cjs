const dotenv = require("dotenv");
const express = require("express");
const cors = require("cors");
const connectWithDB = require("./config/db");
const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const cloudinary = require("cloudinary").v2;
const Place = require("./models/Place.js");
const adminRoutes = require("./routes/admin");
const { renderHTML } = require('./ssr/render.cjs');
const path = require("path");
const fs = require("fs");

dotenv.config();

// Connexion à la base de données
connectWithDB();

// Configuration de Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

// Middleware
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
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
app.use(express.json());

// Routes API
app.use("/api/users", require("./routes/user"));
app.use("/api/admin", require("./routes/admin"));
app.use("/api/admin", adminRoutes);
app.use("/api/places", require("./routes/place"));

app.use("/", require("./routes"));


const clientDistPath = path.join(__dirname, '../client/dist');
// app.use(express.static(clientDistPath));
app.use(express.static(clientDistPath, { index: false }));



app.get("/place/:id", async (req, res) => {
  try {
    const placeId = req.params.id;
    const place = await Place.findById(placeId).lean();

    if (!place) {
      return res.status(404).send("Lieu introuvable");
    }

    const initialPlaces = [place];
    const initialUser = null;

    const html = await renderHTML(req.originalUrl, {
      initialPlaces,
      initialUser,
      env: {
        VITE_GOOGLE_CLIENT_ID: process.env.VITE_GOOGLE_CLIENT_ID,
        VITE_BASE_URL: process.env.VITE_BASE_URL,
      },
    });

    res.status(200).send(html);
  } catch (error) {
    console.error("❌ SSR error (place/:id):", error);
    if (!res.headersSent) {
      res.status(500).json({ error: "Erreur interne du serveur", details: error.message });
    }
  }
});


app.get("*", async (req, res, next) => {
  if (req.url.match(/\.(js|css|png|jpg|svg|ico|json|txt|woff2?)$/)) {
    return next();
  }

  try {
    const initialPlaces = await Place.find().lean();
    const initialUser = null;

    const html = await renderHTML(req.originalUrl, {
      initialPlaces,
      initialUser,
      env: {
        VITE_GOOGLE_CLIENT_ID: process.env.VITE_GOOGLE_CLIENT_ID,
        VITE_BASE_URL: process.env.VITE_BASE_URL,
      },
    });

    res.status(200).send(html);
  } catch (error) {
    console.error("❌ SSR error:", err);
    res.status(500).send("Erreur interne du serveur");
    res.status(500).json({ error: "Erreur interne du serveur", details: err.message });
    if (!res.headersSent) {
      res.status(500).json({ error: 'Rendering failed' });
    } else {
      console.error('Headers already sent, SSR failed:', error);
    }

  }
});


// Lancement du serveur
if (process.env.NODE_ENV !== "test") {
  const port = process.env.PORT || 8000;
  app.listen(port, (err) => {
    if (err) {
      console.log("Erreur lors de la connexion au serveur: ", err);
    }
    console.log(`Le serveur fonctionne sur le port ${port}`);
  });
}

module.exports = app;













// const dotenv = require("dotenv");
// const express = require("express");
// const cors = require("cors");
// const connectWithDB = require("./config/db");
// const cookieSession = require("cookie-session");
// const cookieParser = require("cookie-parser");
// const cloudinary = require("cloudinary").v2;
// const adminRoutes = require("./routes/admin");
// dotenv.config();

// app.get("*", async (req, res) => {
//   const template = fs.readFileSync(
//     path.resolve("../client/dist/index.html"),
//     "utf-8"
//   );

//   // Chargement dynamique du module ESM
//   const { default: render } = await import(
//     path.resolve("../client/dist/entry-server.js")
//   );

//   const appHtml = ReactDOMServer.renderToString(render(req.url));

//   const html = template.replace(
//     `<div id="root"></div>`,
//     `<div id="root">${appHtml}</div>`
//   );

//   res.status(200).send(html);
// });


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
//     //origin: "https://atypikhouse-frontend-main.onrender.com",
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

// // Utilisation des routes API
// app.use("/api/users", require("./routes/user"));
// app.use("/api/admin", adminRoutes);
// app.use("/api/places", require("./routes/place"));

// // Route de base
// app.use("/", require("./routes"));


// // Lancement du serveur
// if (process.env.NODE_ENV !== "test") {
//   const port = process.env.PORT || 8000;
//   app.listen(port, (err) => {
//     if (err) {
//       console.log("Erreur lors de la connexion au serveur: ", err);
//     }
//     console.log(`Le serveur fonctionne sur le port ${port}`);
//   });
// }

// module.exports = app;

