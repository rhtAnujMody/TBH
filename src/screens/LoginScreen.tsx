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
import AppStrings from '../utils/AppStrings';

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
        title={AppStrings.signIn}
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
              <AppSVGs.tbrlogo style={styles.logo} height={150} width={200} />
            </View>
            <View style={styles.signInHeaderContainer}>
              <Text style={styles.signIn}>{AppStrings.signIn}</Text>
              <Text style={styles.signInDesc}>{AppStrings.loginTitle}</Text>
            </View>
          </View>

          <View style={styles.textInputContainer}>
            <AppTextInput
              icon={AppSVGs.name}
              placeHolder={AppStrings.loginEmailPlaceholder}
              returnKeyType="next"
              inputRef={emailRef}
              value={loginStore.userEmail}
              onChangeText={loginStore.setEmail}
              onSubmitEditing={handleOnSubmitEditing}
            />
            <AppTextInput
              icon={AppSVGs.lock}
              placeHolder={AppStrings.loginPasswordPlaceholder}
              returnKeyType="done"
              inputRef={passwordRef}
              secureTextEntry
              onChangeText={loginStore.setPassword}
            />
            <Text
              style={[styles.signUp, styles.flexEnd]}
              onPress={navigateToForgot}>
              {AppStrings.loginForgotPassword}
            </Text>
            <View style={styles.bottomContainer}>
              <Text style={styles.dontHaveAcc}>
                {AppStrings.loginAccountLabel}
                <Text style={styles.signUp} onPress={navigateToSignUp}>
                  &nbsp;{AppStrings.loginSignUp}
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
