import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import CaptureDetailsScreen from '../screens/CaptureDetailsScreen';
import Dashboard from '../screens/Dashboard';
import GenerateReportsScreen from '../screens/GenerateReportsScreen';
import ProgramMonitorScreen from '../screens/ProgramMonitorScreen';
import HealthCampScreen from '../screens/HealthCampScreen';

export type DashboardStackRootParamList = {
  Home: undefined;
  CaptureDetails: undefined;
  GenerateReports: undefined;
  ProgramMonitor: undefined;
  HealthCamp: undefined;
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
        component={HealthCampScreen}
        name="HealthCamp"
      />

      <DashboardStackRoot.Screen
        component={ProgramMonitorScreen}
        name="ProgramMonitor"
      />
      <DashboardStackRoot.Screen
        component={GenerateReportsScreen}
        name="GenerateReports"
      />
    </DashboardStackRoot.Navigator>
  );
};

export default DashboardStack;
