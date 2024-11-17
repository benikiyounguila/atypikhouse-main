import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '@/assets/images/Logo_AtypikHouse.png';
import { useAuth } from '../../../hooks';
import SearchBar from './SearchBar';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';

export const Header = () => {
  const auth = useAuth();
  const location = useLocation();
  const [showSearchBar, setShowSearchBar] = useState(true);
  const [hasShadow, setHasShadow] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { user } = auth;
  const dropdownRef = useRef(null);

  const handleScroll = () => {
    setHasShadow(window.scrollY > 0);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // Hide search bar based on URL
    setShowSearchBar(location.pathname === '/');

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location]);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
        setShowMenu(false); // Fermer le menu burger si on clique en dehors
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header
      className={`fixed top-0 z-10 flex w-screen justify-between bg-white py-4 ${hasShadow ? 'shadow-md' : ''}`}
    >
      <div className="flex items-center justify-between w-full max-w-screen-xl px-4">
        <a href="/" className="flex items-center gap-1">
          <img
            className="h-12 w-24 md:h-16 md:w-32"
            src={Logo}
            alt="AtypikHouse Logo"
          />
        </a>

        {showSearchBar && <SearchBar />}

        {/* Menu Burger */}
        <button onClick={toggleMenu} className="md:hidden flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-8 w-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>

        {/* Avatar avec Menu Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={toggleDropdown}
            className="hidden md:flex h-full items-center gap-2 rounded-full border-gray-300 px-2 py-1 md:border"
          >
            {/* Icône Hamburger avant l'avatar */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6 mr-2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>

            <div className="z-10 h-[35px] w-[35px] overflow-hidden rounded-full">
              {user ? (
                <Avatar>
                  {user?.picture ? (
                    <AvatarImage src={user.picture} className="h-full w-full" />
                  ) : (
                    <AvatarImage
                      src="https://res.cloudinary.com/rahul4019/image/upload/v1695133265/pngwing.com_zi4cre.png"
                      className="h-full w-full"
                    />
                  )}
                </Avatar>
              ) : (
                // Icône fictive pour l'avatar
                <svg
                  fill="#858080"
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  className="h-full w-full"
                >
                  <circle cx="12" cy="12" r="10" />
                </svg>
              )}
            </div>
          </button>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div className="py-1" role="menu" aria-orientation="vertical">
                {user && (
                  <Link
                    to="/account"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Profil
                  </Link>
                )}
                {!user && (
                  <>
                    <Link
                      to="/register"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Inscription
                    </Link>
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Connexion
                    </Link>
                  </>
                )}
                <Link
                  to="/become-host"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Propriétaire
                </Link>
                <Link
                  to="/about"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Découvrir l'entreprise
                </Link>

                <Link
                  to="/cgv"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  CGV
                </Link>
                <Link
                  to="/planSite"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Plan du site
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* Menu Burger Dropdown */}
        {showMenu && (
          <div className="absolute right-0 mt-2 w-full max-w-xs rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-[1000]">
            <div className="py-1">
              {user && (
                <Link
                  to="/account"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Mon Profil
                </Link>
              )}
              {!user && (
                <>
                  <Link
                    to="/register"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Inscription
                  </Link>
                  <Link
                    to="/login"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Connexion
                  </Link>
                </>
              )}
              <Link
                to="/become-host"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Devenez propriétaire
              </Link>
              <Link
                to="/about"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Découvrir l'entreprise
              </Link>
              <Link
                to="/cgv"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                CGV
              </Link>
              <Link
                to="/planSite"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Plan du site
              </Link>
            </div>
          </div>
        )}
      </div>
      <br />
    </header>
  );
};
