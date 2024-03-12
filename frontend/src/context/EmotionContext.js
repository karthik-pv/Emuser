import React, { createContext, useContext, useState } from 'react';

const EmotionContext = createContext();

export const useEmotionContext = () => {
  return useContext(EmotionContext);
};

export const EmotionProvider = ({ children }) => {
  const [EmotionContextValue, setEmotionContextValue] = useState('');

  const updateEmotionContextValue = (newEmotion) => {
    setEmotionContextValue(newEmotion);
  };

  return (
    <EmotionContext.Provider value={{ EmotionContextValue, updateEmotionContextValue }}>
      {children}
    </EmotionContext.Provider>
  );
};
