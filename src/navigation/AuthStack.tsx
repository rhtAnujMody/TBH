import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import WelcomeScreen from '../screens/WelcomeScreen';

export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  SignUp: undefined;
};

const AuthStackRoot = createNativeStackNavigator<AuthStackParamList>();

const AuthStack = () => {
  return (
    <AuthStackRoot.Navigator
      initialRouteName="Welcome"
      screenOptions={{headerShown: false}}>
      <AuthStackRoot.Screen component={WelcomeScreen} name="Welcome" />
      <AuthStackRoot.Screen component={LoginScreen} name="Login" />
      <AuthStackRoot.Screen component={SignUpScreen} name="SignUp" />
    </AuthStackRoot.Navigator>
  );
};

export default AuthStack;
