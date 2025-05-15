// const fs = require('fs');
// const path = require('path');

// // Utilisation de import() dynamique
// async function loadRenderModule() {
//   const { render } = await import('../../client/dist-ssr/entry-server.js');
//   return render;
// }

// async function renderHTML(url, initialData) {
//   const render = await loadRenderModule(); // Appel de la fonction asynchrone pour charger le module
//   const { appHtml, helmet } = await render(url, initialData);

//   const templatePath = path.resolve(__dirname, '../../client/dist/index.html');
//   let template = fs.readFileSync(templatePath, 'utf-8');

//   template = template
//   .replace('<!--app-head-->', `${helmet.title.toString()}${helmet.meta.toString()}${helmet.link.toString()}`)
//   .replace('<!--app-html-->', appHtml)
//   .replace('</body>', `
//     <script>
//       window.__INITIAL_DATA__ = ${JSON.stringify(initialData)};
//     </script>
//   </body>`);

  
//     if (!fs.existsSync(templatePath)) {
//       throw new Error(`Template introuvable à ${templatePath}`);
//     }
    

//   return template;
// }

// module.exports = { renderHTML };

const path = require('path');
const fs = require('fs');

const templatePath = path.join(__dirname, '../../client/dist/index.html');
const template = fs.readFileSync(templatePath, 'utf-8');

// async function renderHTML(url, initialData) {
//   const { render } = await import('../../client/dist-ssr/entry-server.js');

//   const { appHtml, helmet, initialData: _initialData } = await render(url, initialData);

//   const html = template
//     .replace('<!--helmet-title-->', helmet?.title?.toString() || '')
//     .replace('<!--helmet-meta-->', helmet?.meta?.toString() || '')
//     .replace('<!--ssr-outlet-->', appHtml)
//     // .replace(
//     //   '<!--initial-data-->',
//     //   `<script>window.__INITIAL_DATA__ = ${JSON.stringify(_initialData)}</script>`
//     // );
//     .replace(
//       '<!--initial-data-->',
//       `<script>window.__INITIAL_DATA__ = ${JSON.stringify(_initialData).replace(/</g, '\\u003c')}</script>`
//     );
//   try {
//     return html;

//   } catch (error) {
//     console.error("❌ render.cjs failed to render React:", error);
//     throw error;
//   }

// }

// module.exports = { renderHTML };


async function renderHTML(url, initialData) {
  try {
    const { render } = await import('../../client/dist-ssr/entry-server.js');
    const { appHtml, helmet, initialData: _initialData } = await render(url, initialData);

    const html = template
      .replace('<!--helmet-title-->', helmet?.title?.toString() || '')
      .replace('<!--helmet-meta-->', helmet?.meta?.toString() || '')
      .replace('<!--ssr-outlet-->', appHtml)
      .replace(
        '<!--initial-data-->',
        `<script>window.__INITIAL_DATA__ = ${JSON.stringify(_initialData).replace(/</g, '\\u003c')}</script>`
      );

    return html;

  } catch (error) {
    console.error("❌ renderHTML failed to render React:", error);
    throw error;
  }
}
module.exports = { renderHTML };
