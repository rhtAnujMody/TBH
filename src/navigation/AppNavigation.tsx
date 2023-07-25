import {NavigationContainer} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {observer} from 'mobx-react-lite';
import React from 'react';

import Dashboard from '../screens/Dashboard';
import SplashScreen from '../screens/SplashScreen';
import {authStore} from '../stores';
import AuthStack, {AuthStackParamList} from './AuthStack';

type RootStackParamList = {
  Splash: undefined;
  Auth: undefined;
  Home: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

export type AuthStackProps = NativeStackNavigationProp<AuthStackParamList>;

const AppNavigation = observer(() => {
  const {isLoggedIn, showSplash} = authStore;

  return (
    <>
      <NavigationContainer>
        <RootStack.Navigator
          screenOptions={{headerShown: false, animation: 'fade'}}>
          {showSplash ? (
            <RootStack.Screen name="Splash" component={SplashScreen} />
          ) : isLoggedIn ? (
            <RootStack.Screen name="Home" component={Dashboard} />
          ) : (
            <RootStack.Screen name="Auth" component={AuthStack} />
          )}
        </RootStack.Navigator>
      </NavigationContainer>
    </>
  );
});

export default AppNavigation;
