import React, { createContext, useState } from 'react';

// Create the context
export const MapContext = createContext();

// Create the context provider
export const MapContextProvider = ({ children }) => {
  const [lng, setLng] = useState(72.98);
  const [lat, setLat] = useState(33.6);
  const [location, setLocation] = useState('');

  // Define the context value
  const contextValue = {
    lng,
    lat,
    location,
    setLng,
    setLat,
    setLocation,
  };

  // Provide the context value to the children components
  return (
    <MapContext.Provider value={contextValue}>
      {children}
    </MapContext.Provider>
  );
};
