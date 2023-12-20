import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';

import { AppProvider } from './contexts';
import { AppNavigation } from './navigations';

const App = () => {
    return (
        <PaperProvider>
            <AppProvider>
                <AppNavigation />
            </AppProvider>
        </PaperProvider>
    );
};

export default App;
