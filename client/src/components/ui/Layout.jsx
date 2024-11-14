import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Header } from './Header';
import Footer from './Footer';
import Breadcrumb from './Breadcrumb';

const Layout = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <div className="flex flex-col min-h-screen">
      <Helmet>
        <title>Contrôlez vos logements insolites - AtypikHouse</title>
        <meta
          name="description"
          content="Suivez vos réservations et commencez votre aventure en toute simplicité avec notre application intuitive pour la gestion de logements insolites."
        />
        <link
          rel="canonical"
          href={`https://votredomaine.com${location.pathname}`}
        />
      </Helmet>

      <Header />
      <div className="container mx-auto px-4 py-4 text-gray-600 text-center mt-20 text-sm">
        <Breadcrumb />
      </div>
      {isHomePage && (
        <main className="flex-grow mt-20">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl md:text-5xl font-bold text-center mt-16 mb-4">
              Prenez le contrôle de vos logements insolites
            </h1>
            <p className="text-gray-800 text-center mb-8">
              Suivez vos réservations, inscrivez-vous dès aujourd'hui et
              commencez votre aventure <br />
              en toute simplicité avec notre application intuitive !
            </p>

            <div className="flex justify-center items-center space-x-4 mb-12">
              <Link
                to="/login"
                className="btn btn-sm md:btn-md btn-outline btn-accent"
                aria-label="Se connecter à votre compte"
              >
                Se connecter
              </Link>
              <Link
                to="/register"
                className="btn btn-sm md:btn-md btn-accent"
                aria-label="Créer un nouveau compte"
              >
                S'inscrire
              </Link>
            </div>
          </div>
        </main>
      )}

      <div className="flex-grow">
        <Outlet />
      </div>

      <nav className="container mx-auto px-4 py-8">
        <h2 className="text-xl font-semibold mb-4">Liens utiles</h2>
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <li>
            <Link to="/about" className="text-blue-600 hover:underline">
              À propos de nous
            </Link>
          </li>
          <li>
            <Link to="/cgv" className="text-blue-600 hover:underline">
              CGV
            </Link>
          </li>
          <li>
            <Link to="/sitemap" className="text-blue-600 hover:underline">
              Plan du site
            </Link>
          </li>
          <li>
            <Link to="/contact" className="text-blue-600 hover:underline">
              Contact
            </Link>
          </li>
        </ul>
      </nav>

      <Footer />
    </div>
  );
};

export default Layout;
