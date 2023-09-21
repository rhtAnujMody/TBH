import {useNavigation} from '@react-navigation/native';
import {Observer, observer} from 'mobx-react-lite';
import {useRef} from 'react';
import {Text, TextInput, View} from 'react-native';
import {AppSVGs} from '../assets';
import {AppBack, AppButton, AppContainer, AppTextInput} from '../components';
import {useKeyboard} from '../custom_hooks';
import {AuthStackProps} from '../navigation/AppNavigation';
import {useLoginStore} from '../stores';
import {loginStyles} from '../styles/loginStyles';
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
                Don't have an account yet?
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
