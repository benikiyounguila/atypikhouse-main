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
        <main className="flex-grow mt-18">
          <div className="container mx-auto px-4 py-22">
            <h1
              className="text-blue-800 md:text-5xl font-bold text-center mt-16 mb-4
             "
            >
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

      <Footer />
    </div>
  );
};

export default Layout;
