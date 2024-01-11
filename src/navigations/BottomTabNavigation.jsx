import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import { EventsStack, ManagementStack, NotificationStack, TasksStack } from './StackNavigations';
import { Color, ScreenName } from '../common';
import { Icon, View } from '../components';
import NotificationsScreen from '../screens/notification/NotificationsScreen';

const BottomTabNavigation = () => {
  const BottomTab = createBottomTabNavigator();

  const tabBarLabelStyle = {
    fontSize: 14,
    fontWeight: '600',
    paddingBottom: 8,
  };

  return (
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
