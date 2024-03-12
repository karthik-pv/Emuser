import React, { createContext, useContext, useState } from 'react';

const GenreContext = createContext();

export const useGenreContext = () => {
  return useContext(GenreContext);
};

export const GenreProvider = ({ children }) => {
  const [GenreContextValue, setGenreContextValue] = useState('');

  const updateGenreContextValue = (newGenre) => {
    setGenreContextValue(newGenre);
  };

  return (
    <GenreContext.Provider value={{ GenreContextValue, updateGenreContextValue }}>
      {children}
    </GenreContext.Provider>
  );
};
