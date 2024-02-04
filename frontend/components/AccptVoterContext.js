import React, { createContext, useContext, useState } from 'react';

// Create a context for Aadhar data
const AcceptVoterContext = createContext({
  acceptVoter: true,
  setAcceptVoter: () => {},
});

// AadharProvider component that wraps its children with AadharContext.Provider
export function AcceptVoterContextProvider({ children }) {
  const [acceptVoter, setAcceptVoter] = useState(true);

  return (
    <AcceptVoterContext.Provider value={{ acceptVoter, setAcceptVoter }}>
      {children}
    </AcceptVoterContext.Provider>
  );
}

export const useAcceptVoterContext = () => useContext(AcceptVoterContext)