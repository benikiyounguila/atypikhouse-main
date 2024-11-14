import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import './styles/index.css';
import * as serviceWorkerRegistration from './serviceWorkerRegistration'; // Importation du service worker

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
);

// Enregistrer le service worker pour activer le mode hors-ligne et d'autres fonctionnalités PWA
serviceWorkerRegistration.register();
