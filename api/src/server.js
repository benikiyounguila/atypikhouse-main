import express from 'express';
import path from 'path';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import App from '../../client/src/App';

const app = express();
const port = process.env.PORT || 3000;

//Servir les fichiers statiques du build client
app.use(express.static(path.resolve(__dirname, '../../client/build')));

app.get('*', (req, res) => {
    const context = {};
    const app = ReactDOMServer.renderToString(
        <StaticRouter location={req.url} context={context}>
            <App />
        </StaticRouter>
    );

    const html = `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
      <meta charset="utf-8">
      <title>React SSR App</title>
    </head>
    <body>
      <div id="root">${app}</div>
      <script src="/static/js/main.js"></script>
    </body>
    </html>
  `;

    res.send(html);
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});