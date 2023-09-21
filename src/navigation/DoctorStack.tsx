import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {RouteProp} from '@react-navigation/native';
import DocObservationScreen from '../screens/DocObservationScreen';
import CalculateFieldsScreen from '../screens/CalculateFieldsScreen';

export type DoctorStackRootParamList = {
  Calculate: {from: string};
  Doctor: {id: string};
};

export type DoctorScreenRouteProp = RouteProp<
  DoctorStackRootParamList,
  'Doctor'
>;

export type CalculateScreenRouteProp = RouteProp<
  DoctorStackRootParamList,
  'Calculate'
>;

const DoctorStackRoot = createNativeStackNavigator<DoctorStackRootParamList>();

const DoctorStack = () => {
  return (
    <DoctorStackRoot.Navigator
      initialRouteName="Calculate"
      screenOptions={{headerShown: false}}>
      <DoctorStackRoot.Screen
        component={CalculateFieldsScreen}
        name="Calculate"
      />
      <DoctorStackRoot.Screen component={DocObservationScreen} name="Doctor" />
    </DoctorStackRoot.Navigator>
  );
};

export default DoctorStack;
