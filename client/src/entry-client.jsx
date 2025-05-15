// // client/src/entry-client.jsx
// import React from 'react';
// import { hydrateRoot } from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';
// import App from './App';

// hydrateRoot(document.getElementById('root'), (
//   <BrowserRouter>
//     <App />
//   </BrowserRouter>
// ));
// entry-client.jsx ou main.jsx

// import React from 'react';
// import { hydrateRoot } from 'react-dom/client';
// import App from './App';
// import { BrowserRouter } from 'react-router-dom';
// import { HelmetProvider } from 'react-helmet-async';
// import { UserProvider } from './providers/UserProvider';
// import { PlaceProvider } from './providers/PlaceProvider';
// import { GoogleOAuthProvider } from '@react-oauth/google';

// const initialData = window.__INITIAL_DATA__ || {};
// const { initialUser = null, initialPlaces = [] } = initialData;

// hydrateRoot(
//   document.getElementById('root'),
//   <HelmetProvider>
//     <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
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
// console.log("✅ Hydratation initiale :", initialData);

import React from 'react';
import { hydrateRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { GoogleOAuthProvider } from '@react-oauth/google';

import App from './App';
import { UserProvider } from './providers/UserProvider';
import { PlaceProvider } from './providers/PlaceProvider';

// Récupérer les données injectées par le serveur dans le HTML
const initialData = window.__INITIAL_DATA__ || {};
const { initialUser = null, initialPlaces = [], env = {} } = initialData;

hydrateRoot(
  document.getElementById('root'),
  <HelmetProvider>
    <GoogleOAuthProvider clientId={env.VITE_GOOGLE_CLIENT_ID}>
      <UserProvider initialUser={initialUser}>
        <PlaceProvider initialPlaces={initialPlaces}>
          <BrowserRouter>
            <App initialUser={initialUser} initialPlaces={initialPlaces} />
          </BrowserRouter>
        </PlaceProvider>
      </UserProvider>
    </GoogleOAuthProvider>
  </HelmetProvider>
);
