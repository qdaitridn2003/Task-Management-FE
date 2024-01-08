import { createContext } from 'react';

import { AuthProvider } from './AuthContext';

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  return (
    <AuthProvider>
      <AppContext.Provider value={{}}>{children}</AppContext.Provider>
    </AuthProvider>
  );
};
