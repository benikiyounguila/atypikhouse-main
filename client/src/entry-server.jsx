// client/entry-server.jsx
import React from "react";
import { StaticRouter } from "react-router-dom/server";
import { renderToString } from "react-dom/server";
import App from "./App";
import { HelmetProvider } from "react-helmet-async";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { UserProvider } from "./providers/UserProvider";
import { PlaceProvider } from "./providers/PlaceProvider";

export async function render(url, initialData) {
  const helmetContext = {};

  const { initialUser = null, initialPlaces = [], env = {} } = initialData;

  const app = (
    <HelmetProvider context={helmetContext}>
      <GoogleOAuthProvider clientId={env.VITE_GOOGLE_CLIENT_ID}>
        <UserProvider initialUser={initialUser}>
          <PlaceProvider initialPlaces={initialPlaces}>
            <StaticRouter location={url}>
              <App initialUser={initialUser} initialPlaces={initialPlaces} />
            </StaticRouter>
          </PlaceProvider>
        </UserProvider>
      </GoogleOAuthProvider>
    </HelmetProvider>
  );

  const appHtml = renderToString(app);

  return {
    appHtml,
    helmet: helmetContext.helmet,
    initialData
  };
}


// // entry-server.jsx




// entry-server.jsx
// export async function render(url, initialData) {
//   const helmetContext = {};

//   const app = (
//     <HelmetProvider context={helmetContext}>
//       <GoogleOAuthProvider clientId={initialData.env?.VITE_GOOGLE_CLIENT_ID}>
//         <UserProvider initialUser={initialData.initialUser}>
//           <PlaceProvider initialPlaces={initialData.initialPlaces}>
//             <StaticRouter location={url}>
//               <App />
//             </StaticRouter>
//           </PlaceProvider>
//         </UserProvider>
//       </GoogleOAuthProvider>
//     </HelmetProvider>
//   );

//   const appHtml = renderToString(app);

//   // Vérifie ici la structure de helmetContext
//   console.log('helmetContext:', helmetContext);

//   return {
//     appHtml,
//     helmetContext, // On s'assure que helmetContext est retourné correctement
//     initialData
//   };
// }



// import React from 'react';
// import { hydrateRoot } from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';
// import App from './App';
// import { HelmetProvider } from 'react-helmet-async';
// import { UserProvider } from './providers/UserProvider';
// import { PlaceProvider } from './providers/PlaceProvider';
// import { GoogleOAuthProvider } from '@react-oauth/google';

// // Récupère les données initiales injectées côté serveur
// const initialData = window.__INITIAL_DATA__ || {};

// hydrateRoot(
//   document.getElementById('root'),
//   <HelmetProvider>
//     <GoogleOAuthProvider clientId={initialData.env?.VITE_GOOGLE_CLIENT_ID}>
//       <UserProvider initialUser={initialData.initialUser}>
//         <PlaceProvider initialPlaces={initialData.initialPlaces}>
//           <BrowserRouter>
//             <App />
//           </BrowserRouter>
//         </PlaceProvider>
//       </UserProvider>
//     </GoogleOAuthProvider>
//   </HelmetProvider>
// );
