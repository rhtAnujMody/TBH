import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import GenerateReportsScreen from '../screens/GenerateReportsScreen';
import CalculateFieldsScreen from '../screens/CalculateFieldsScreen';

export type ReportsStackRootParamList = {
  Calculate: undefined;
  Generate: undefined;
};

const ReportsStackRoot =
  createNativeStackNavigator<ReportsStackRootParamList>();

const ReportsStack = () => {
  return (
    <ReportsStackRoot.Navigator
      initialRouteName="Calculate"
      screenOptions={{headerShown: false}}>
      <ReportsStackRoot.Screen
        component={CalculateFieldsScreen}
        name="Calculate"
      />
      <ReportsStackRoot.Screen
        component={GenerateReportsScreen}
        name="Generate"
      />
    </ReportsStackRoot.Navigator>
  );
};

export default ReportsStack;
