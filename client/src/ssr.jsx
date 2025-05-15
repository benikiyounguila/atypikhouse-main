// import React from 'react';
// import ReactDOMServer from 'react-dom/server';
// import { HelmetProvider } from 'react-helmet-async';
// import App from './App';

// const html = ReactDOMServer.renderToString(
//   <HelmetProvider>
//     <App />
//   </HelmetProvider>,
// );

// console.log(html);

// import { HelmetProvider } from 'react-helmet-async';
// import { renderToString } from 'react-dom/server';
// import { StaticRouter } from 'react-router-dom/server';
// import App from './App';

// export function render(url) {
//   return {
//     html: renderToString(
//       <HelmetProvider>
//         <StaticRouter location={url}>
//           <App />
//         </StaticRouter>
//       </HelmetProvider>,
//     ),
//   };
// }

// import pkg from 'react-helmet-async';
// const { HelmetProvider } = pkg;
// import { renderToString } from 'react-dom/server';
// import { StaticRouter } from 'react-router-dom/server';
// import App from './App';

// export function render(url) {
//   return {
//     html: renderToString(
//       <HelmetProvider>
//         <StaticRouter location={url}>
//           <App />
//         </StaticRouter>
//       </HelmetProvider>,
//     ),
//   };
// }
// client/src/ssr.jsx
import React from 'react';
import { renderToString } from 'react-dom/server';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';

export async function render(url) {
  // <-- Utilisez `export` au lieu de `module.exports`
  const helmetContext = {};
  const appHtml = renderToString(
    <HelmetProvider context={helmetContext}>
      <App />
    </HelmetProvider>,
  );
  const { helmet } = helmetContext;

  return `
    <!DOCTYPE html>
    <html ${helmet.htmlAttributes.toString()}>
      <head>
        ${helmet.title.toString()}
        ${helmet.meta.toString()}
        ${helmet.link.toString()}
      </head>
      <body ${helmet.bodyAttributes.toString()}>
        <div id="root">${appHtml}</div>
        <script type="module" src="/src/main.jsx"></script>
      </body>
    </html>
  `;
}
