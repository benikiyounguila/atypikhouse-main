import React from 'react';
import { Link } from 'react-router-dom';

const PlaceCard = ({ place }) => {
  const { _id: placeId, photos, address, title, price } = place;
  const altText = `View of ${title} in ${address}`; // Définition du texte alt

  return (
    <Link to={`/place/${placeId}`} className="m-2 flex flex-col md:m-1 xl:m-0">
      <div className="card">
        {photos?.[0] && (
          <img
            src={`${photos[0]}`}
            alt={altText}
            title={altText} // Info-bulle au survol
            className="h-48 w-full rounded-xl object-cover" // Taille fixe pour toutes les images
          />
        )}
        <h2 className="truncate font-bold mt-2">{address}</h2>
        <h3 className="truncate text-sm text-gray-500">{title}</h3>
        <div className="mt-1">
          <span className="font-semibold">{price}€ </span>
          per night
        </div>
      </div>
    </Link>
  );
};

export default PlaceCard;
