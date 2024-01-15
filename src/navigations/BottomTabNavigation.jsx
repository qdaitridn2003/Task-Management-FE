import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect, useState } from 'react';

import {
  EventsStack,
  ManagementEmployeeStack,
  ManagementStack,
  TasksStack,
} from './StackNavigations';
import { Color, ScreenName, accessTokenKey } from '../common';
import { ActivityIndicator, Icon, View } from '../components';
import { asyncStorageGetItem, axiosAuthGet } from '../configs';
import NotificationsScreen from '../screens/notification/NotificationsScreen';

const BottomTab = createBottomTabNavigator();

const BottomTabNavigation = () => {
  const [isEmployee, setIsEmployee] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const accessToken = await asyncStorageGetItem(accessTokenKey);
      const respone = await axiosAuthGet('/employee/get-employee-profile', accessToken);
      if (respone) {
        if (respone.employee.auth.role.name !== 'Admin') {
          setIsEmployee(true);
        }
        setIsLoading(false);
      }
    })();
  });

  const tabBarLabelStyle = {
    fontSize: 14,
    fontWeight: '600',
    paddingBottom: 8,
  };

  return isLoading ? (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <ActivityIndicator size={48} color={Color.primary} />
    </View>
  ) : isEmployee ? (
    <BottomTab.Navigator
      initialRouteName={ScreenName.demo}
      screenOptions={{
        headerShown: false,
        tabBarStyle: { height: 64 },
        tabBarActiveTintColor: Color.primary,
        tabBarInactiveTintColor: Color.neutral2,
      }}>
      <BottomTab.Screen
        name={ScreenName.events}
        component={EventsStack}
        options={{
          tabBarLabelStyle,
          tabBarIcon: ({ color }) => (
            <View tw="pt-2">
              <Icon source={require('../assets/icons/Event.png')} color={color} />
            </View>
          ),
        }}
      />

      <BottomTab.Screen
        name={ScreenName.tasks}
        component={TasksStack}
        options={{
          tabBarLabelStyle,
          tabBarIcon: ({ color }) => (
            <View tw="pt-2">
              <Icon source={require('../assets/icons/Task.png')} color={color} />
            </View>
          ),
        }}
      />

      <BottomTab.Screen
        name={ScreenName.notification}
        component={NotificationsScreen}
        options={{
          tabBarLabelStyle,
          tabBarIcon: ({ color }) => (
            <View tw="pt-2">
              <Icon source={require('../assets/icons/NotificationsOutline.png')} color={color} />
            </View>
          ),
        }}
      />

      <BottomTab.Screen
        name={ScreenName.ManagementEmployee}
        component={ManagementEmployeeStack}
        options={{
          tabBarLabelStyle,
          tabBarIcon: ({ color }) => (
            <View tw="pt-2">
              <Icon source={require('../assets/icons/PersonOutline.png')} color={color} />
            </View>
          ),
        }}
      />
    </BottomTab.Navigator>
  ) : (
    <BottomTab.Navigator
      initialRouteName={ScreenName.demo}
      screenOptions={{
        headerShown: false,
        tabBarStyle: { height: 64 },
        tabBarActiveTintColor: Color.primary,
        tabBarInactiveTintColor: Color.neutral2,
      }}>
      <BottomTab.Screen
        name={ScreenName.events}
        component={EventsStack}
        options={{
          tabBarLabelStyle,
          tabBarIcon: ({ color }) => (
            <View tw="pt-2">
              <Icon source={require('../assets/icons/Event.png')} color={color} />
            </View>
          ),
        }}
      />

      <BottomTab.Screen
        name={ScreenName.tasks}
        component={TasksStack}
        options={{
          tabBarLabelStyle,
          tabBarIcon: ({ color }) => (
            <View tw="pt-2">
              <Icon source={require('../assets/icons/Task.png')} color={color} />
            </View>
          ),
        }}
      />

      <BottomTab.Screen
        name={ScreenName.notification}
        component={NotificationsScreen}
        options={{
          tabBarLabelStyle,
          tabBarIcon: ({ color }) => (
            <View tw="pt-2">
              <Icon source={require('../assets/icons/NotificationsOutline.png')} color={color} />
            </View>
          ),
        }}
      />

      <BottomTab.Screen
        name={ScreenName.management}
        component={ManagementStack}
        options={{
          tabBarLabelStyle,
          tabBarIcon: ({ color }) => (
            <View tw="pt-2">
              <Icon source={require('../assets/icons/Manager.png')} color={color} />
            </View>
          ),
        }}
      />
    </BottomTab.Navigator>
  );
};

export default BottomTabNavigation;
