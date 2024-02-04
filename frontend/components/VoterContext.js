import React, { createContext, useState, useContext } from 'react';

// Create a context for Voter ID data
const VoterIdContext = createContext({
  voterId: "",
  setVoterId: () => {},
});

// VoterIdProvider component that wraps its children with VoterIdContext.Provider
export function VoterIdProvider({ children }) {
  const [voterId, setVoterId] = useState('');

  return (
    <VoterIdContext.Provider value={{ voterId, setVoterId }}>
      {children}
    </VoterIdContext.Provider>
  );
}

// Custom hook to use the VoterIdContext
export const useVoterContext = () => {
  const context = useContext(VoterIdContext);
  if (!context) {
    throw new Error('useVoterContext must be used within a VoterIdProvider');
  }
  return context;
};

