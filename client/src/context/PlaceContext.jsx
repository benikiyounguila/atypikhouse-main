// client/src/context/PlaceContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const PlaceContext = createContext({
    places: [],
    loading: true,
    setPlaces: () => {},
    setLoading: () => {},
});

export const PlaceProvider = ({ children, initialPlaces = [] }) => {
    const [places, setPlaces] = useState(initialPlaces);
    const [loading, setLoading] = useState(initialPlaces.length === 0); // Initialise à true si pas de données initiales

    useEffect(() => {
        if (initialPlaces.length > 0) {
            setPlaces(initialPlaces);
            setLoading(false);
        }
    }, [initialPlaces]);

    return (
        <PlaceContext.Provider value={{ places, loading, setPlaces, setLoading }}>
            {children}
        </PlaceContext.Provider>
    );
};

export const usePlaces = () => useContext(PlaceContext);