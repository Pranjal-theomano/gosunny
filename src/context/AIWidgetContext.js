import React, { createContext, useContext, useState } from "react";

const AIWidgetContext = createContext();

export const AIWidgetProvider = ({ children }) => {
  const [botIntroduced, setBotIntroduced] = useState(false);
  const [micPermission, setMicPermission] = useState("pending"); // 'pending' | 'granted' | 'denied'

  return (
    <AIWidgetContext.Provider
      value={{
        botIntroduced,
        setBotIntroduced,
        micPermission,
        setMicPermission,
      }}
    >
      {children}
    </AIWidgetContext.Provider>
  );
};

export const useAIWidgetContext = () => {
  const context = useContext(AIWidgetContext);
  if (!context) {
    // throw new Error(
    //   "useAIWidgetContext must be used within an AIWidgetProvider"
    // );
  }
  return context;
};
