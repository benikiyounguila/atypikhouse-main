import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Header } from './Header';

const MentionsLegales = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow mt-20">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl md:text-5xl font-bold text-center mt-16 mb-4">
            Mentions Légales
          </h1>
          <div className="text-gray-800 text-center mb-8">
            <h1>Mentions Légales</h1>
            <h2>Éditeur du site</h2>
            <p>[Nom de votre entreprise ou votre nom]</p>
            <p>[Adresse]</p>
            <p>Téléphone : [Numéro de téléphone]</p>
            <p>Email : [Adresse email]</p>

            <h2>Directeur de la publication</h2>
            <p>[Nom du directeur de publication]</p>

            <h2>Hébergeur</h2>
            <p>[Nom de l'hébergeur]</p>
            <p>[Adresse de l'hébergeur]</p>

            <h2>Propriété intellectuelle</h2>
            <p>
              Tous les contenus présents sur ce site sont protégés par le droit
              d'auteur.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MentionsLegales;
