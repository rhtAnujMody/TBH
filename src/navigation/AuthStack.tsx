import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import LoginScreen from '../screens/LoginScreen';
import SignUpScreen from '../screens/SignUpScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import ForgotPassword from '../screens/ForgotPassword';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import OTPScreen from '../screens/OTPScreen';

export type AuthStackParamList = {
  Welcome: undefined;
  Login: undefined;
  SignUp: undefined;
  Forgot: undefined;
  Reset: undefined;
  OTP: undefined;
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
      <AuthStackRoot.Screen component={ForgotPassword} name="Forgot" />
      <AuthStackRoot.Screen component={ResetPasswordScreen} name="Reset" />
      <AuthStackRoot.Screen component={OTPScreen} name="OTP" />
    </AuthStackRoot.Navigator>
  );
};

export default AuthStack;
