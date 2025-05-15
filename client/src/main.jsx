import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.jsx';
// import './styles/index.css';

// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </React.StrictMode>,
// );
// import React from 'react';
// import { hydrateRoot } from 'react-dom/client';
// import { BrowserRouter } from 'react-router-dom';
// import App from './App';
// import { HelmetProvider } from 'react-helmet-async';
// import { UserProvider } from './providers/UserProvider';
// import { PlaceProvider } from './providers/PlaceProvider';
// import { GoogleOAuthProvider } from '@react-oauth/google';

// const initialData = window.__INITIAL_DATA__ || {};

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

const initialData = window.__INITIAL_DATA__ || {};

hydrateRoot(
  document.getElementById('root'),
  <BrowserRouter>
    <App
      initialUser={initialData.initialUser}
      initialPlaces={initialData.initialPlaces}
    />
  </BrowserRouter>
);
