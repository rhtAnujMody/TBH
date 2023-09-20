import {RouteProp, useRoute} from '@react-navigation/native';
import {Observer, observer} from 'mobx-react-lite';
import React = require('react');
import {useRef} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

import {AppSVGs} from '../assets';
import {AppBack, AppButton, AppContainer, AppTextInput} from '../components';
import {useKeyboard} from '../custom_hooks';
import {colors, typography} from '../theme';
import {useResetStore} from '../stores';
import {AuthStackParamList} from '../navigation/AuthStack';

const ResetPasswordScreen = () => {
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const keyboard = useKeyboard();
  const styles = loginStyles(keyboard);
  const resetStore = useResetStore();
  const route = useRoute<RouteProp<AuthStackParamList, 'Reset'>>();
  const {id} = route.params;

  const ShowButton = observer(() => {
    return (
      <AppButton
        title="Reset"
        isLoading={resetStore.isLoading}
        onPress={() => {
          resetStore.handleSubmit(id);
        }}
        enabled={resetStore.isButtonEnabled}
      />
    );
  });

  return (
    <Observer>
      {() => (
        <AppContainer style={styles.container}>
          <AppBack />
          <View style={styles.headerContainer}>
            <AppSVGs.reset style={styles.logo} />
          </View>

          <View style={styles.textInputContainer}>
            <View style={styles.signInHeaderContainer}>
              <Text style={styles.signIn}>Reset Password</Text>
              <Text style={styles.signInDesc}>
                Please Enter Your New Password
              </Text>
            </View>

            <AppTextInput
              icon={AppSVGs.lock}
              placeHolder="New Password"
              returnKeyType="done"
              inputRef={emailRef}
              secureTextEntry
              onChangeText={resetStore.setNewPassword}
            />
            <AppTextInput
              icon={AppSVGs.lock}
              placeHolder="Confirm Password"
              returnKeyType="done"
              inputRef={passwordRef}
              secureTextEntry
              onChangeText={resetStore.setConfirmPWD}
            />

            <View style={styles.bottomContainer}>
              <ShowButton />
            </View>
          </View>
        </AppContainer>
      )}
    </Observer>
  );
};

export default ResetPasswordScreen;

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
      marginBottom: 20,
    },
    signIn: {
      ...typography.bold(20, colors.black),
      width: '100%',
    },
    signInDesc: {
      ...typography.regular(13),
    },
    textInputContainer: {
      flex: 1,
      marginTop: 20,
      backgroundColor: 'white',
      borderTopRightRadius: 40,
      borderTopLeftRadius: 40,
      paddingHorizontal: 30,
      paddingTop: 30,
    },
    bottomContainer: {
      width: '100%',
      position: 'absolute',
      bottom: 20,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
    },
    dontHaveAcc: {
      ...typography.medium(14),
      marginBottom: 20,
    },
    signUp: {
      color: colors.palette.primary,
    },
  });
};
