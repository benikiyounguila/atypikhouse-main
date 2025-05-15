// require("@babel/register")({
//   presets: ["@babel/preset-env", "@babel/preset-react"],
// });
// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const connectWithDB = require("../config/db");
// const cookieSession = require("cookie-session");
// const cookieParser = require("cookie-parser");
// const cloudinary = require("cloudinary").v2;
// const adminRoutes = require("../routes/admin");
// //const App = require("../client/src/App");
// const fs = require("fs");
// const React = require("react");
// const { useEffect } = require("react");
// const ReactDOMServer = require("react-dom/server");
// const App = require("../../client/src/App").default;

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

// app.use("^/$", (req, res, next) => {
//   fs.readFile(
//     path.resolve("../client/dist/index.html"),
//     "utf-8",
//     (err, data) => {
//       if (err) {
//         console.log(err);
//         return res.status(500).send("Some error happened");
//       }
//       return res.send(
//         data.replace(
//           '<div id="root"></div>',
//           `<div id="root">${ReactDOMServer.renderToString(<App />)}</div>`
//         )
//       );
//     }
//   );
// });

// app.use(express.static(__dirname, "..", "client/dist/assets"));
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
