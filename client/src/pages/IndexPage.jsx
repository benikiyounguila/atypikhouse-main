import React, { useState, useEffect } from 'react';
import { usePlaces } from '../../hooks';
import Spinner from '@/components/ui/Spinner';
import PlaceCard from '@/components/ui/PlaceCard';

const IndexPage = () => {
  const allPlaces = usePlaces();
  const { places, loading } = allPlaces;
  const [currentPage, setCurrentPage] = useState(1);
  const [placesPerPage] = useState(12); // Vous pouvez ajuster ce nombre selon vos besoins

  // Get current places
  const indexOfLastPlace = currentPage * placesPerPage;
  const indexOfFirstPlace = indexOfLastPlace - placesPerPage;
  const currentPlaces = places.slice(indexOfFirstPlace, indexOfLastPlace);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    // Reset to first page when places change (e.g., after filtering)
    setCurrentPage(1);
  }, [places]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <div className="px-4 py-38  bg-gray-100">
      <div className="grid grid-cols-1 justify-items-center md:grid-cols-2 md:gap-0 lg:grid-cols-3 lg:gap-2 xl:grid-cols-4 xl:gap-10">
        {currentPlaces.length > 0 ? (
          currentPlaces.map((place) => (
            <PlaceCard place={place} key={place._id} />
          ))
        ) : (
          <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 z-50">
            <div className="text-center p-8 bg-white shadow-lg rounded-lg">
              <h1 className="text-3xl font-semibold mb-4">Result not found!</h1>
              <p className="text-lg font-semibold mb-6">
                Sorry, we couldn&#39;t find the place you&#39;re looking for.
              </p>
              <button className="rounded-full bg-primary p-2 text-white hover:bg-primary-dark transition duration-300">
                <a href="/" className="flex items-center justify-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <line x1="19" y1="12" x2="5" y2="12"></line>
                    <polyline points="12 19 5 12 12 5"></polyline>
                  </svg>
                  Go back
                </a>
              </button>
            </div>
          </div>
        )}
      </div>
      {places.length > placesPerPage && (
        <Pagination
          placesPerPage={placesPerPage}
          totalPlaces={places.length}
          paginate={paginate}
          currentPage={currentPage}
        />
      )}
    </div>
  );
};

const Pagination = ({ placesPerPage, totalPlaces, paginate, currentPage }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPlaces / placesPerPage); i++) {
    pageNumbers.push(i);
  }

  // Fonction pour obtenir les numéros de page à afficher
  const getPageNumbers = () => {
    const totalPages = pageNumbers.length;
    if (totalPages <= 5) return pageNumbers;

    if (currentPage <= 3) return [1, 2, 3, 4, 5, '...', totalPages];
    if (currentPage >= totalPages - 2)
      return [
        1,
        '...',
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];

    return [
      1,
      '...',
      currentPage - 1,
      currentPage,
      currentPage + 1,
      '...',
      totalPages,
    ];
  };

  return (
    <nav className="flex justify-center mt-8">
      <ul className="flex flex-wrap justify-center items-center space-x-2">
        <li>
          <button
            onClick={() => paginate(Math.max(1, currentPage - 1))}
            className="px-2 py-1 border rounded bg-white text-primary hover:bg-primary hover:text-white transition-colors"
            disabled={currentPage === 1}
          >
            &laquo;
          </button>
        </li>
        {getPageNumbers().map((number, index) => (
          <li key={index}>
            {number === '...' ? (
              <span className="px-2 py-1">...</span>
            ) : (
              <button
                onClick={() => paginate(number)}
                className={`px-2 py-1 border rounded ${
                  currentPage === number
                    ? 'bg-primary text-white'
                    : 'bg-white text-primary hover:bg-primary hover:text-white'
                } transition-colors`}
              >
                {number}
              </button>
            )}
          </li>
        ))}
        <li>
          <button
            onClick={() =>
              paginate(Math.min(pageNumbers.length, currentPage + 1))
            }
            className="px-2 py-1 border rounded bg-white text-primary hover:bg-primary hover:text-white transition-colors"
            disabled={currentPage === pageNumbers.length}
          >
            &raquo;
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default IndexPage;
