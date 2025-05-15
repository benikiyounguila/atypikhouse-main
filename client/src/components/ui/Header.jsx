import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
//import Logo from '@/assets/images/Logo_AtypikHouse.png';
import Logo from '../../assets/images/Logo_AtypikHouse.png';
import { useAuth } from '../../../hooks';
import SearchBar from './SearchBar';
import { Avatar, AvatarImage } from '@radix-ui/react-avatar';
import  ClienOnly from '../utils/ClientOnly'

export const Header = () => {
  const auth = useAuth();
  const location = useLocation();
  const [showSearchBar, setShowSearchBar] = useState(true);
  const [hasShadow, setHasShadow] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const { user } = auth;
  const menuRef = useRef(null);

  const handleScroll = () => {
    setHasShadow(window.scrollY > 0);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    setShowSearchBar(location.pathname === '/');
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [location]);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const menuItems = [
    { to: '/account', text: 'Mon Profil', userOnly: true },
    { to: '/register', text: 'Inscription', guestOnly: true },
    { to: '/login', text: 'Connexion', guestOnly: true },
    { to: '/infos-proprietaires', text: 'Infos Propriétaires' },
    { to: '/about', text: "Découvrir l'entreprise" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-10 flex justify-between items-center bg-white py-4 ${hasShadow ? 'shadow-md' : ''}`}
    >
      <div className="flex justify-between items-center w-full max-w-screen-xl mx-auto px-4">
        <a href="/" className="flex items-center gap-1">
          <img
            className="h-12 w-24 md:h-16 md:w-32"
            src="/Logo_AtypikHouse.png"
            alt="AtypikHouse Logo"
          />
        </a>

        {showSearchBar && <SearchBar />}

        <div className="relative" ref={menuRef}>
          <button
            onClick={toggleMenu}
            className="flex items-center justify-center rounded-full border border-gray-300 p-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
            <div className="ml-2 h-[35px] w-[35px] overflow-hidden rounded-full hidden md:block">
              {user ? (
                <ClienOnly>
                <Avatar>
                  <AvatarImage
                    src={
                      user.picture ||
                      'https://res.cloudinary.com/rahul4019/image/upload/v1695133265/pngwing.com_zi4cre.png'
                    }
                    className="h-full w-full"
                  />
                  </Avatar>
                  </ClienOnly>
              ) : (
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

          {showMenu && (
            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-[1000]">
              <div className="py-1">
                {menuItems.map(
                  (item, index) =>
                    ((item.userOnly && user) ||
                      (item.guestOnly && !user) ||
                      (!item.userOnly && !item.guestOnly)) && (
                      <Link
                        key={index}
                        to={item.to}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        {item.text}
                      </Link>
                    ),
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
