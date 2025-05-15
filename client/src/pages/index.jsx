// import React from 'react';

// const Home = () => {
//   return <div>Welcome to the SSR with MERN!</div>;
// };

// export default Home;

// import App from '../App';
// export default function Home() {
//   return <App />;
// }

// pages/index.js

import { useState, useEffect } from 'react';
import App from '../App'; // Assurez-vous que vous importez correctement App

// Fonction pour récupérer les données côté serveur (SSR)
export async function getServerSideProps() {
  // Exemple de données récupérées côté serveur
  const message = 'Bienvenue sur notre site !';

  return {
    props: { message },
  };
}

// Composant principal de la page d'accueil
export default function Home({ message }) {
  const [clientMessage, setClientMessage] = useState('');

  // Cette partie est exécutée côté client
  useEffect(() => {
    setClientMessage('Chargé côté client');
  }, []);

  return (
    <>
      <h1>{message}</h1>
      <h2>{clientMessage}</h2>
      <App /> {/* Ici tu intègres ton composant App */}
    </>
  );
}
