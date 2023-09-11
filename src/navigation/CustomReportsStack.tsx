import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import CustomReportsScreen from '../screens/CustomReportsScreen';
import ReportsScreen from '../screens/ReportsScreen';
import {RouteProp} from '@react-navigation/native';

export type CustomReportsStackRootParamList = {
  Custom: undefined;
  Reports: {data: string; id: string};
};

export type CustomScreenRouteProp = RouteProp<
  CustomReportsStackRootParamList,
  'Custom'
>;

export type ReportsScreenRouteProp = RouteProp<
  CustomReportsStackRootParamList,
  'Reports'
>;

const ReportsStackRoot =
  createNativeStackNavigator<CustomReportsStackRootParamList>();

const CustomReportsStack = () => {
  return (
    <ReportsStackRoot.Navigator
      initialRouteName="Custom"
      screenOptions={{headerShown: false}}>
      <ReportsStackRoot.Screen component={CustomReportsScreen} name="Custom" />
      <ReportsStackRoot.Screen component={ReportsScreen} name="Reports" />
    </ReportsStackRoot.Navigator>
  );
};

export default CustomReportsStack;
