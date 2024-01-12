import { createContext } from 'react';

import { AuthProvider } from './AuthContext';
import { ClientProvider } from './ClientContext';
import { EmployeeProvider } from './EmployeeContext';

export const AppContext = createContext({});

export const AppProvider = ({ children }) => {
  return (
    <EmployeeProvider>
      <ClientProvider>
        <AuthProvider>
          <AppContext.Provider value={{}}>{children}</AppContext.Provider>
        </AuthProvider>
      </ClientProvider>
    </EmployeeProvider>
  );
};
