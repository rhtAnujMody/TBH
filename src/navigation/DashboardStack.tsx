import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {NavigatorScreenParams} from '@react-navigation/native';

import CaptureDetailsScreen from '../screens/CaptureDetailsScreen';
import Dashboard from '../screens/Dashboard';
import ProgramMonitorScreen from '../screens/ProgramMonitorScreen';
import HealthCampScreen from '../screens/HealthCampScreen';
import ReportsStack from './ReportsStack';
import {ReportsStackRootParamList} from './ReportsStack';
import DoctorStack, {DoctorStackRootParamList} from './DoctorStack';
import ReportsScreen from '../screens/ReportsScreen';
import CustomReportsStack, {
  CustomReportsStackRootParamList,
} from './CustomReportsStack';

export type DashboardStackRootParamList = {
  Home: undefined;
  ReportsStack: NavigatorScreenParams<ReportsStackRootParamList>; //
  DoctorStack: NavigatorScreenParams<DoctorStackRootParamList>;
  CustomStack: NavigatorScreenParams<CustomReportsStackRootParamList>;
  CaptureDetails: undefined;
  ProgramMonitor: undefined;
  HealthCamp: undefined;
  Reports: {data: string; id: string};
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
      <DashboardStackRoot.Screen component={ReportsScreen} name="Reports" />
      <DashboardStackRoot.Screen component={ReportsStack} name="ReportsStack" />
      <DashboardStackRoot.Screen component={DoctorStack} name="DoctorStack" />
      <DashboardStackRoot.Screen
        component={CustomReportsStack}
        name="CustomStack"
      />
    </DashboardStackRoot.Navigator>
  );
};

export default DashboardStack;
