import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {AppSVGs} from '../assets';
import {AppContainer} from '../components';
import {useAsyncStorage} from '../custom_hooks';
import {UserModal} from '../models/UserModal';
import {authStore} from '../stores';
import {colors} from '../theme';
import AppStrings from '../utils/AppStrings';

function SplashScreen() {
  const {getData} = useAsyncStorage();
  const auth = authStore;

  useEffect(() => {
    const checkUserAuth = async () => {
      // const isLoggedIn = await getData(AppStrings.isLogin, false);
      // if (isLoggedIn) {
      //   const userData = await getData<UserModal>(AppStrings.userData, null);
      //   auth.setUserData(userData!!);
      // }
      // auth.setIsLogin(isLoggedIn!!);
      setTimeout(() => {
        auth.toggleSplash(false);
      }, 1000);
    };
    checkUserAuth();
  }, []);

  return (
    <AppContainer style={styles.container}>
      <View style={styles.circle1} />
      <View style={styles.circle2} />
      <View style={styles.logoContainer}>
        <AppSVGs.logo />
      </View>
    </AppContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  circle1: {
    width: 400,
    height: 400,
    position: 'absolute',
    left: -200,
    bottom: -200,
    borderRadius: 200,
    backgroundColor: colors.palette.primary,
  },
  circle2: {
    width: 200,
    height: 200,
    position: 'absolute',
    right: -100,
    top: -90,
    borderRadius: 100,
    backgroundColor: colors.palette.primary,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
  },
});

export default SplashScreen;
