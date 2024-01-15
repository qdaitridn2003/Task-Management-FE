import React from 'react';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';

import { Color } from './common';
import { AppProvider } from './contexts';
import { AppNavigation } from './navigations';

import { MenuProvider } from 'react-native-popup-menu';

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Color.primary,
    secondary: Color.secondary,
    success: Color.success,
    warn: Color.warn,
    danger: Color.danger,
    info: Color.info,
  },
};

const App = () => {
  return (
    <MenuProvider>
      <PaperProvider theme={theme}>
        <AppProvider>
          <AppNavigation />
        </AppProvider>
      </PaperProvider>
    </MenuProvider>
  );
};

export default App;
