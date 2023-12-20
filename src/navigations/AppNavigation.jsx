import React, { useContext } from 'react';

import AuthNavigation from './AuthNavigation';
import HomeNavigation from './HomeNavigation';
import { AuthContext } from '../contexts';

const AppNavigation = () => {
    const { isLogin } = useContext(AuthContext);
    return isLogin ? <HomeNavigation /> : <AuthNavigation />;
};

export default AppNavigation;
