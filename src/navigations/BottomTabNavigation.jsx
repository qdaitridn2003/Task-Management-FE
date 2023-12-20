import {
    FontAwesome5,
    FontAwesome,
    MaterialCommunityIcons,
    MaterialIcons,
} from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';

import { Color, ScreenName } from '../common';
import { DemoScreen, InquiryScreen, TestScreen, TrialScreen } from '../screens';

const BottomTabNavigation = () => {
    const BottomTab = createBottomTabNavigator();
    return (
        <BottomTab.Navigator
            initialRouteName={ScreenName.demo}
            screenOptions={{
                headerShown: false,
                tabBarStyle: { height: 70 },
                tabBarActiveTintColor: Color.primary,
            }}>
            <BottomTab.Screen
                name={ScreenName.demo}
                component={DemoScreen}
                options={{
                    tabBarLabelStyle: { fontSize: 14, fontWeight: '600' },
                    tabBarIcon: ({ color }) => (
                        <FontAwesome5 name="democrat" size={24} color={color} />
                    ),
                }}
            />
            <BottomTab.Screen
                name={ScreenName.inquiry}
                component={InquiryScreen}
                options={{
                    tabBarLabelStyle: { fontSize: 14, fontWeight: '600' },
                    tabBarIcon: ({ color }) => (
                        <MaterialIcons name="liquor" size={24} color={color} />
                    ),
                }}
            />
            <BottomTab.Screen
                name={ScreenName.test}
                component={TestScreen}
                options={{
                    tabBarLabelStyle: { fontSize: 14, fontWeight: '600' },
                    tabBarIcon: ({ color }) => (
                        <MaterialCommunityIcons name="test-tube" size={24} color={color} />
                    ),
                }}
            />
            <BottomTab.Screen
                name={ScreenName.trial}
                component={TrialScreen}
                options={{
                    tabBarLabelStyle: { fontSize: 14, fontWeight: '600' },
                    tabBarIcon: ({ color }) => <FontAwesome name="try" size={28} color={color} />,
                }}
            />
        </BottomTab.Navigator>
    );
};

export default BottomTabNavigation;
