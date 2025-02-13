// Breadcrumb.js
import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);
  const isHomePage = location.pathname === '/';

  if (isHomePage) {
    return null;
  }

  return (
    <nav aria-label="Fil d'Ariane">
      <ol className="flex space-x-2">
        <li>
          <Link to="/" className="text-blue-600 hover:underline">
            Accueil
          </Link>
        </li>
        {pathnames.map((pathname, index) => {
          const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
          return (
            <li key={routeTo}>
              <span>/</span>
              <Link to={routeTo} className="text-blue-600 hover:underline">
                {pathname.charAt(0).toUpperCase() + pathname.slice(1)}
              </Link>
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
