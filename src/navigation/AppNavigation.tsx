import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import type {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {observer} from 'mobx-react-lite';

import SplashScreen from '../screens/SplashScreen';
import {authStore} from '../stores';
import AuthStack, {AuthStackParamList} from './AuthStack';
import DashboardStack, {DashboardStackRootParamList} from './DashboardStack';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {StyleSheet} from 'react-native';

type RootStackParamList = {
  Splash: undefined;
  Auth: undefined;
  Dashboard: undefined;
};

const RootStack = createNativeStackNavigator<RootStackParamList>();

export type AuthStackProps = NativeStackNavigationProp<AuthStackParamList>;
export type DashboardStackProps =
  NativeStackNavigationProp<DashboardStackRootParamList>;

const AppNavigation = observer(() => {
  const {isLoggedIn, showSplash} = authStore;

  return (
    <>
      <NavigationContainer>
        <GestureHandlerRootView style={styles.gestureContainer}>
          <RootStack.Navigator
            screenOptions={{headerShown: false, animation: 'fade'}}>
            {showSplash ? (
              <RootStack.Screen name="Splash" component={SplashScreen} />
            ) : isLoggedIn ? (
              <RootStack.Screen name="Dashboard" component={DashboardStack} />
            ) : (
              <RootStack.Screen name="Auth" component={AuthStack} />
            )}
          </RootStack.Navigator>
        </GestureHandlerRootView>
      </NavigationContainer>
    </>
  );
});
const styles = StyleSheet.create({
  gestureContainer: {
    flex: 1,
  },
});

export default AppNavigation;
