import { FontAwesome5 } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';

import { Color, ScreenName } from '../common';
import { DemoScreen, InquiryScreen, ManagementScreen, TestScreen, TrialScreen } from '../screens';

import { AccountStack, EventsStack, ManagementStack, TasksStack } from './StackNavigations';
import { Icon, View } from '../components';
import NotificationsScreen from '../screens/notification/NotificationsScreen';
import { CustomModalScreen } from '../components/customs/CustomModalScreen';

const BottomTabNavigation = () => {
  const BottomTab = createBottomTabNavigator();
  const navigation = useNavigation();

  const tabBarLabelStyle = {
    fontSize: 14,
    fontWeight: '600',
    paddingBottom: 8,
  };

  return (
    <>
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
            tabBarLabelStyle: tabBarLabelStyle,
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
            tabBarLabelStyle: tabBarLabelStyle,
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
            tabBarLabelStyle: tabBarLabelStyle,
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
            tabBarLabelStyle: tabBarLabelStyle,
            tabBarIcon: ({ color }) => (
              <View tw="pt-2">
                <Icon source={require('../assets/icons/Manager.png')} color={color} />
              </View>
            ),
          }}
        />
      </BottomTab.Navigator>
    </>
  );
};

export default BottomTabNavigation;
