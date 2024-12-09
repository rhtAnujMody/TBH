import React, {useEffect} from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {AppSVGs} from '../assets';
import {AppContainer} from '../components';
import {useAsyncStorage} from '../custom_hooks';
import {authStore} from '../stores';
import {colors} from '../theme';
import AppStrings from '../utils/AppStrings';
import Utility from '../utils/Utility';
import {UserData} from '../models';
import {Observer} from 'mobx-react-lite';

function SplashScreen() {
  const {getData} = useAsyncStorage();
  const auth = authStore;

  const checkUserAuth = async () => {
    const isLoggedIn = await getData(AppStrings.isLogin, false);
    if (isLoggedIn) {
      const userData = await getData<UserData>(AppStrings.userData, null);
      Utility.logData(userData);
      if (userData) {
        auth.setUserData(userData);
      }
    }
    auth.setIsLogin(isLoggedIn!!);
    setTimeout(() => {
      auth.toggleSplash(false);
    }, 1000);
  };

  useEffect(() => {
    realmFunctions();
  }, []);

  const realmFunctions = async () => {
    try {
      await auth.initializeRealm();
      const data = await auth.readFromRealm();
      if (data > 0) {
        auth.setShowLoader(true);
        auth.sendRealmToServer().then(() => {
          checkUserAuth();
          auth.setShowLoader(false);
        });
      } else {
        checkUserAuth();
      }
    } catch (e) {
      checkUserAuth();
      console.log('e', e);
    }
  };

  return (
    <Observer>
      {() => (
        <AppContainer style={styles.container}>
          <View style={styles.circle1} />
          <View style={styles.circle2} />
          <View style={styles.logoContainer}>
            <AppSVGs.tbrlogo />
            {auth.showLoader && (
              <View style={styles.sendDataStyle}>
                <Text style={styles.textStyle}>
                  Transfering Local Data to Server. Please Wait.
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.textStyle}>
                    {auth.sentRecords} / {auth.totalRecords}
                  </Text>
                </View>
                <ActivityIndicator
                  color={colors.palette.primary}
                  size={'large'}
                />
              </View>
            )}
          </View>
        </AppContainer>
      )}
    </Observer>
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
    alignItems: 'center',
  },
  sendDataStyle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    fontSize: 16,
    color: colors.palette.textColor,
    marginVertical: 5,
  },
});

export default SplashScreen;
