import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {AppSVGs} from '../assets';
import {AppButton, AppContainer} from '../components';
import {AuthStackProps} from '../navigation/AppNavigation';
import {colors, typography} from '../theme';

const WelcomeScreen = () => {
  const navigation = useNavigation<AuthStackProps>();

  const navigateToLogin = () => {
    navigation.navigate('Login');
  };
  const navigateToSignUp = () => {
    navigation.navigate('SignUp');
  };

  return (
    <AppContainer style={styles.container}>
      <View style={styles.logoContainer}>
        <AppSVGs.logo />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.welcomeText}>
          {'Welcome to \nDecimal Foundation'}
        </Text>
        <View style={styles.buttonContainer}>
          <AppButton
            title="Sign In"
            onPress={navigateToLogin}
            width={'50%'}
            style={styles.signIn}
          />
          <AppButton
            style={styles.signUpContainer}
            textStyle={styles.singUp}
            title="Sign Up"
            width={'50%'}
            onPress={navigateToSignUp}
          />
        </View>
        <AppSVGs.buildings style={styles.buildings} />
      </View>
    </AppContainer>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoContainer: {
    flex: 1.8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    backgroundColor: colors.palette.primary,
    borderTopRightRadius: 40,
    borderTopLeftRadius: 40,
  },
  welcomeText: {
    ...typography.bold(26, colors.black),
    marginLeft: 30,
    marginTop: 30,
  },
  buttonContainer: {
    marginHorizontal: 30,
    marginTop: 20,
    flexDirection: 'row',
    zIndex: 10,
  },
  signIn: {
    marginRight: 10,
  },
  signUpContainer: {
    backgroundColor: 'white',
  },
  singUp: {
    color: colors.black,
  },
  buildings: {
    width: 20,
    position: 'absolute',
    bottom: 0,
    left: -10,
  },
});
