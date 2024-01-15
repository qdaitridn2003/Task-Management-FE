import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import BottomTabNavigation from './BottomTabNavigation';
import { ScreenName } from '../common';

const HomeNavigation = () => {
  const HomeStack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <HomeStack.Navigator
        initialRouteName={ScreenName.bottomTab}
        screenOptions={{ headerShown: false }}>
        <HomeStack.Screen
          name={ScreenName.bottomTab}
          component={BottomTabNavigation}
          options={({ route }) => ({
            tabBarVisible: route.state && route.state.index === 0,
          })}
        />
      </HomeStack.Navigator>
    </NavigationContainer>
  );
};

export default HomeNavigation;
