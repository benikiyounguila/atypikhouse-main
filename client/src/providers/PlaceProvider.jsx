// import { createContext } from 'react';

// import { useProvidePlaces } from '../../hooks';

// const initialState = {
//   places: [],
//   setPlaces: () => {},
//   loading: true,
//   setLoading: () => {},
// };

// export const PlaceContext = createContext(initialState);

// export const PlaceProvider = ({ children }) => {
//   const allPlaces = useProvidePlaces();

//   return (
//     <PlaceContext.Provider value={allPlaces}>{children}</PlaceContext.Provider>
//   );
// };

// pour le SSR
import { createContext } from 'react';
import { useProvidePlaces } from '../../hooks';

const initialState = {
  places: [],
  setPlaces: () => {},
  loading: true,
  setLoading: () => {},
};

export const PlaceContext = createContext(initialState);

export const PlaceProvider = ({ children, initialPlaces = [] }) => {
  const places = useProvidePlaces(initialPlaces);
  return (
    <PlaceContext.Provider value={places}>{children}</PlaceContext.Provider>
  );
};
