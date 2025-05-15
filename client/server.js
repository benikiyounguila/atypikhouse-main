// import express from 'express';
// import next from 'next';
// import httpProxy from 'http-proxy';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import dotenv from 'dotenv';

// dotenv.config();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const dev = process.env.NODE_ENV !== 'production';
// const app = next({ dev, dir: path.join(__dirname, 'src') }); // Spécifiez le répertoire des pages
// const handle = app.getRequestHandler();
// const API_URL = 'http://localhost:4000'; // URL de votre API

// app.prepare().then(() => {
//   const server = express();
//   const proxy = httpProxy.createProxyServer();

//   // Rediriger les requêtes API vers le serveur API
//   server.use('/api', (req, res) => {
//     proxy.web(req, res, { target: API_URL });
//   });

//   server.get('/account', (req, res) => {
//     return app.render(req, res, '/account', req.query);
//   });
//   // Gérer toutes les autres requêtes avec Next.js
//   server.get('*', (req, res) => {
//     return handle(req, res);
//   });

//   server.listen(3000, (err) => {
//     if (err) throw err;
//     console.log('> Ready on http://localhost:3000');
//   });
// });

// import express from 'express';
// import next from 'next';
// import httpProxy from 'http-proxy';
// import path from 'path';
// import { fileURLToPath } from 'url';
// import dotenv from 'dotenv';

// dotenv.config();

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// const dev = process.env.NODE_ENV !== 'production';
// const app = next({ dev, dir: path.join(__dirname, 'src') });
// const handle = app.getRequestHandler();
// const API_URL = 'http://localhost:4000'; // URL de votre API

// app.prepare().then(() => {
//   const server = express();
//   const proxy = httpProxy.createProxyServer();

//   // Rediriger les requêtes API vers le serveur API
//   server.use('/api', (req, res) => {
//     proxy.web(req, res, { target: API_URL });
//   });

//   // Servir les fichiers statiques
//   server.use('/static', express.static(path.join(__dirname, 'public')));

//   // Gérer les requêtes pour la page d'accueil
//   server.get('/', (req, res) => {
//     return app.render(req, res, '/', req.query);
//   });

//   // Gérer les requêtes pour /account
//   server.get('/account', (req, res) => {
//     return app.render(req, res, '/account', req.query);
//   });

//   // Gérer toutes les autres requêtes avec Next.js
//   server.get('*', (req, res) => {
//     return handle(req, res);
//   });

//   // Gérer les erreurs avec un middleware
//   server.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).send('Something broke!');
//   });

//   server.listen(3000, (err) => {
//     if (err) throw err;
//     console.log('> Ready on http://localhost:3000');
//   });
// });
