import React from 'react';
import { Provider as PaperProvider, DefaultTheme } from 'react-native-paper';

import { AppProvider } from './contexts';
import { AppNavigation } from './navigations';

import { Color } from './common';

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
    }
}

const App = () => {
    return (
        <PaperProvider theme={theme}>
            <AppProvider>
                <AppNavigation />
            </AppProvider>
        </PaperProvider>
    );
};

export default App;
