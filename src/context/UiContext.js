import React, { createContext, useContext, useState } from 'react';

// Create Context
const UIContext = createContext();

// Provider Component
export function UIProvider({ children }) {
  const [isVisible, setIsVisible] = useState(true);

  // Toggle visibility function
  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <UIContext.Provider value={{ isVisible, toggleVisibility }}>
      {children}
    </UIContext.Provider>
  );
}

// Custom Hook to use the Context
export function useUIContext() {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUIContext must be used within a UIProvider');
  }
  return context;
}
