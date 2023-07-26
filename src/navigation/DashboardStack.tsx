import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import CaptureDetailsScreen from '../screens/CaptureDetailsScreen';
import Dashboard from '../screens/Dashboard';
import GenerateReportsScreen from '../screens/GenerateReportsScreen';

export type DashboardStackRootParamList = {
  Home: undefined;
  CaptureDetails: {title?: string};
  GenerateReports: {title?: string};
};

const DashboardStackRoot =
  createNativeStackNavigator<DashboardStackRootParamList>();

const DashboardStack = () => {
  return (
    <DashboardStackRoot.Navigator
      initialRouteName="Home"
      screenOptions={{headerShown: false}}>
      <DashboardStackRoot.Screen component={Dashboard} name="Home" />
      <DashboardStackRoot.Screen
        component={CaptureDetailsScreen}
        name="CaptureDetails"
      />
      <DashboardStackRoot.Screen
        component={GenerateReportsScreen}
        name="GenerateReports"
      />
    </DashboardStackRoot.Navigator>
  );
};

export default DashboardStack;
