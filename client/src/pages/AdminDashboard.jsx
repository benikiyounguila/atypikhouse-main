import React from 'react';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div>
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">Tableau de Bord Administrateur</h1>
        <nav className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <Link 
            to="/admin/users" 
            className="bg-white shadow-lg rounded-lg p-6 text-center hover:bg-gray-200 transition duration-200"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke="currentColor" 
              className="h-12 w-12 mx-auto text-gray-700 mb-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c1.656 0 3-1.344 3-3s-1.344-3-3-3-3 1.344-3 3 1.344 3 3 3zm0 2.25c-2.762 0-7.5 1.44-7.5 4.25v.75h15v-.75c0-2.81-4.738-4.25-7.5-4.25z"/>
            </svg>
            Gérer les utilisateurs
          </Link>
          <Link 
            to="/admin/equipments" 
            className="bg-white shadow-lg rounded-lg p-6 text-center hover:bg-gray-200 transition duration-200"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke="currentColor" 
              className="h-12 w-12 mx-auto text-gray-700 mb-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18.75V5.25c0-1.35 1.125-2.25 2.25-2.25h7.5c1.125 0 2.25.9 2.25 2.25v13.5"/>
            </svg>
            Gérer les équipements
          </Link>
          <Link 
            to="/admin/properties" 
            className="bg-white shadow-lg rounded-lg p-6 text-center hover:bg-gray-200 transition duration-200"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke="currentColor" 
              className="h-12 w-12 mx-auto text-gray-700 mb-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 15v4.5a2.25 2.25 0 01-2.25 2.25h-10.5a2.25 2.25 0 01-2.25-2.25v-4.5M4.5 10.5L12 4.5l7.5 6M12 4.5v10.5"/>
            </svg>
            Gérer les propriétés
          </Link>
          <Link 
            to="/admin/comments" 
            className="bg-white shadow-lg rounded-lg p-6 text-center hover:bg-gray-200 transition duration-200"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              strokeWidth={1.5} 
              stroke="currentColor" 
              className="h-12 w-12 mx-auto text-gray-700 mb-4"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.25h18M3 12h18M3 15.75h18M5.25 8.25v10.5M18.75 8.25v10.5"/>
            </svg>
            Modérer les commentaires
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default AdminDashboard;
