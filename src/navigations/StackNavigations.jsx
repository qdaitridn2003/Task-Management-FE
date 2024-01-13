import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import { ScreenName } from '../common';
import {
  AddEventScreen,
  AddTaskScreen,
  EventDetailsScreen,
  EventsScreen,
  NotificationScreen,
  TaskDetailsScreen,
  TasksScreen,
  NotificationDetailScreen,
  EmployeeScreen,
  EmployeeDetailsScreen,
  UpdateRoleEmployeeScreen,
  DemoScreen,
  ClientScreen,
  ClientDetailsScreen,
  AddClientScreen,
  ListClientDisabled,
} from '../screens';
import AccountDetailsScreen from '../screens/account/AccountDetailsScreen';
import EditAccountScreen from '../screens/account/EditAccountScreen';
import { ManagementScreen } from '../screens/management';
import { UpdateClientScreen } from '../screens/client';
import { ClientProvider, EmployeeProvider } from '../contexts';
export const EventsStack = () => {
  const EventsStack = createNativeStackNavigator();
  return (
    <EventsStack.Navigator
      initialRouteName={ScreenName.eventsList}
      screenOptions={{ headerShown: false }}>
      <EventsStack.Screen name={ScreenName.eventsList} component={EventsScreen} />
      <EventsStack.Screen name={ScreenName.eventDetails} component={EventDetailsScreen} />
      <EventsStack.Screen name={ScreenName.addEvent} component={AddEventScreen} />
    </EventsStack.Navigator>
  );
};

export const TasksStack = () => {
  const TasksStack = createNativeStackNavigator();
  return (
    <TasksStack.Navigator
      initialRouteName={ScreenName.tasksList}
      screenOptions={{ headerShown: false }}>
      <TasksStack.Screen name={ScreenName.tasksList} component={TasksScreen} />
      <TasksStack.Screen name={ScreenName.taskDetails} component={TaskDetailsScreen} />
      <TasksStack.Screen name={ScreenName.addTask} component={AddTaskScreen} />
    </TasksStack.Navigator>
  );
};

export const AccountStack = () => {
  const AccountStack = createNativeStackNavigator();
  return (
    <AccountStack.Navigator
      initialRouteName={ScreenName.accountDetails}
      screenOptions={{ headerShown: false }}>
      <AccountStack.Screen name={ScreenName.accountDetails} component={AccountDetailsScreen} />
      <AccountStack.Screen name={ScreenName.editAccount} component={EditAccountScreen} />
      {/* <AccountStack.Screen name={ScreenName.changePassword} component={ChangePasswordScreen} /> */}
    </AccountStack.Navigator>
  );
};

export const ClientStack = () => {
  const ClientStack = createNativeStackNavigator();
  return (
    <ClientProvider>
      <ClientStack.Navigator
        initialRouteName={ScreenName.clientList}
        screenOptions={{ headerShown: false }}>
        <ClientStack.Screen name={ScreenName.clientList} component={ClientScreen} />
        <ClientStack.Screen name={ScreenName.clientDetails} component={ClientDetailsScreen} />
        <ClientStack.Screen name={ScreenName.addClient} component={AddClientScreen} />
        <ClientStack.Screen name={ScreenName.updateClient} component={UpdateClientScreen} />
      </ClientStack.Navigator>
    </ClientProvider>
  );
};

export const EmployeeStack = () => {
  const Employee = createNativeStackNavigator();
  return (
    <EmployeeProvider>
      <Employee.Navigator
        initialRouteName={ScreenName.employeeList}
        screenOptions={{ headerShown: false }}>
        <Employee.Screen name={ScreenName.employeeList} component={EmployeeScreen} />
        <Employee.Screen name={ScreenName.employeeDetails} component={EmployeeDetailsScreen} />
        <Employee.Screen name={ScreenName.updatRoleEmployee} component={UpdateRoleEmployeeScreen} />
      </Employee.Navigator>
    </EmployeeProvider>
  );
};

export const ManagementStack = () => {
  const ManagementStack = createNativeStackNavigator();
  return (
    <ManagementStack.Navigator
      initialRouteName={ScreenName.management}
      screenOptions={{ headerShown: false }}>
      <ManagementStack.Screen name={ScreenName.managementMenu} component={ManagementScreen} />
      <ManagementStack.Screen name={ScreenName.account} component={AccountStack} />
      <ManagementStack.Screen name={ScreenName.demo} component={DemoScreen} />
      <ManagementStack.Screen name={ScreenName.client} component={ClientStack} />
      <ManagementStack.Screen name={ScreenName.employee} component={EmployeeStack} />
    </ManagementStack.Navigator>
  );
};
