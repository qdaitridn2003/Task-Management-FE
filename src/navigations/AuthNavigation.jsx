import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { ScreenName } from '../common';
import {
  SignInScreen,
  SignUpScreen,
  ForgotPasswordScreen,
  AddEmployee,
  ResetPasswordScreen,
} from '../screens';

const AuthNavigation = () => {
  const AuthStack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <AuthStack.Navigator
        initialRouteName={ScreenName.signIn}
        screenOptions={{
          headerShown: false,
        }}>
        <AuthStack.Screen name={ScreenName.signIn} component={SignInScreen} />
        <AuthStack.Screen name={ScreenName.signUp} component={SignUpScreen} />
        <AuthStack.Screen name={ScreenName.forgotPassword} component={ForgotPasswordScreen} />
        <AuthStack.Screen name={ScreenName.resetPassword} component={ResetPasswordScreen} />
        <AuthStack.Screen name={ScreenName.addEmployee} component={AddEmployee} />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
};

export default AuthNavigation;
