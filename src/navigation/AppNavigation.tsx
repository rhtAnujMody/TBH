import {NavigationContainer} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {observer} from 'mobx-react-lite';
import React, {useEffect, useState} from 'react';
import Dashboard from '../screens/Dashboard';
import SplashScreen from '../screens/SplashScreen';
import authStore from '../stores/authStore';
import AuthStack, {AuthStackParamList} from './AuthStack';
import Toast from 'react-native-toast-message';

type RootStackParamList = {
  Splash: undefined;
  Auth: undefined;
  Home: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

export type AuthStackProps = NativeStackNavigationProp<AuthStackParamList>;

const AppNavigation = observer(() => {
  const {isLoggedIn} = authStore;
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setShowSplash(false);
    }, 1000);
  }, []);

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
      <Toast />
    </>
  );
});

export default AppNavigation;
