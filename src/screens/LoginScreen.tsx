import {useNavigation} from '@react-navigation/native';
import {Observer, observer} from 'mobx-react-lite';
import {useRef} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {AppSVGs} from '../assets';
import {AppBack, AppButton, AppContainer, AppTextInput} from '../components';
import {useKeyboard} from '../custom_hooks';
import {AuthStackProps} from '../navigation/AppNavigation';
import {useLoginStore} from '../stores';
import {colors, typography} from '../theme';
import React = require('react');

const LoginScreen = () => {
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const keyboard = useKeyboard();
  const styles = loginStyles(keyboard);
  const navigation = useNavigation<AuthStackProps>();
  const loginStore = useLoginStore();

  const handleOnSubmitEditing = () => {
    if (passwordRef && passwordRef.current) {
      passwordRef.current.focus();
    }
  };

  const navigateToSignUp = () => {
    navigation.navigate('SignUp');
  };
  const navigateToForgot = () => {
    navigation.navigate('Forgot');
  };

  const ShowButton = observer(() => {
    return (
      <AppButton
        title="Sign In"
        isLoading={loginStore.isLoading}
        onPress={loginStore.login}
        enabled={loginStore.isButtonEnabled}
      />
    );
  });

  return (
    <Observer>
      {() => (
        <AppContainer style={styles.container}>
          <AppBack />
          <View style={styles.headerContainer}>
            <View style={styles.logoContainer}>
              <AppSVGs.logo style={styles.logo} />
            </View>
            <View style={styles.signInHeaderContainer}>
              <Text style={styles.signIn}>Sign In</Text>
              <Text style={styles.signInDesc}>
                Provide your Login Credentials to Sign In to the Application
              </Text>
            </View>
          </View>

          <View style={styles.textInputContainer}>
            <AppTextInput
              icon={AppSVGs.name}
              placeHolder="Email Id"
              returnKeyType="next"
              inputRef={emailRef}
              value={loginStore.userEmail}
              onChangeText={loginStore.setEmail}
              onSubmitEditing={handleOnSubmitEditing}
            />
            <AppTextInput
              icon={AppSVGs.lock}
              placeHolder="Password"
              returnKeyType="done"
              inputRef={passwordRef}
              secureTextEntry
              onChangeText={loginStore.setPassword}
            />
            <Text
              style={[styles.signUp, styles.flexEnd]}
              onPress={navigateToForgot}>
              {' Forgot Password '}
            </Text>
            <View style={styles.bottomContainer}>
              <Text style={styles.dontHaveAcc}>
                Don't have account yet?
                <Text style={styles.signUp} onPress={navigateToSignUp}>
                  {' Sign Up'}
                </Text>
              </Text>
              <ShowButton />
            </View>
          </View>
        </AppContainer>
      )}
    </Observer>
  );
};

export default LoginScreen;

const loginStyles = (isKeyboardVisible: boolean) => {
  return StyleSheet.create({
    container: {
      backgroundColor: colors.palette.primary,
    },
    headerContainer: {
      flex: isKeyboardVisible ? 0.4 : 0.7,
      justifyContent: 'center',
    },
    logoContainer: {
      flex: 1,
      justifyContent: 'flex-end',
    },
    logo: {
      alignSelf: 'center',
      marginTop: 10,
    },
    signInHeaderContainer: {
      flex: 1,
      justifyContent: 'flex-end',
      marginHorizontal: 40,
    },
    signIn: {
      ...typography.bold(24, colors.black),
    },
    signInDesc: {
      ...typography.medium(15),
    },
    textInputContainer: {
      flex: 1,
      marginTop: 20,
      backgroundColor: 'white',
      borderTopRightRadius: 40,
      borderTopLeftRadius: 40,
      paddingHorizontal: 30,
      paddingTop: 30,
      alignItems: 'center',
    },
    bottomContainer: {
      width: '100%',
      position: 'absolute',
      bottom: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    dontHaveAcc: {
      ...typography.medium(14),
      marginBottom: 20,
    },
    signUp: {
      color: colors.palette.primary,
    },
    flexEnd: {alignSelf: 'flex-end'},
  });
};
