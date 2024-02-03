import React, { createContext, useContext, useState } from 'react';

// Create a context for Aadhar data
const AadharContext = createContext({
  aadhar: "",
  setAadhar: () => {},
});

// AadharProvider component that wraps its children with AadharContext.Provider
export function AadharProvider({ children }) {
  const [aadhar, setAadhar] = useState('');

  return (
    <AadharContext.Provider value={{ aadhar, setAadhar }}>
      {children}
    </AadharContext.Provider>
  );
}

export const useAdharContext = () => useContext(AadharContext)