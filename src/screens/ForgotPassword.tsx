import {observer} from 'mobx-react-lite';
import {useRef} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {AppSVGs} from '../assets';
import {AppBack, AppButton, AppContainer, AppTextInput} from '../components';
import {useKeyboard} from '../custom_hooks';
import {colors, typography} from '../theme';
import {useForgotPasswordStore} from '../stores';
import React = require('react');
import AppStrings from '../utils/AppStrings';

const ForgotPassword = () => {
  const emailRef = useRef<TextInput>(null);
  const keyboard = useKeyboard();
  const styles = loginStyles(keyboard);
  const forgotStore = useForgotPasswordStore();
  const handleOnSubmitEditing = () => {};

  const ShowButton = observer(() => {
    return (
      <AppButton
        title={AppStrings.sendOTP}
        isLoading={forgotStore.isLoading}
        onPress={forgotStore.handleSubmit}
        enabled={forgotStore.isButtonEnabled}
      />
    );
  });

  return (
    <AppContainer style={styles.container}>
      <AppBack />
      <View style={styles.headerContainer}>
        <View style={styles.logoContainer}>
          <AppSVGs.forgot style={styles.logo} />
        </View>
      </View>

      <View style={styles.textInputContainer}>
        <View style={styles.signInHeaderContainer}>
          <Text style={styles.signIn}>{AppStrings.forgotPassword}</Text>
          <Text style={styles.signInDesc}>{AppStrings.resetPasswordEmail}</Text>
        </View>
        <AppTextInput
          icon={AppSVGs.name}
          placeHolder={AppStrings.emailPhone}
          returnKeyType="next"
          inputRef={emailRef}
          onChangeText={forgotStore.setPhoneNumber}
          onSubmitEditing={handleOnSubmitEditing}
        />

        <View style={styles.bottomContainer}>
          <ShowButton />
        </View>
      </View>
    </AppContainer>
  );
};

export default ForgotPassword;

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
    signInHeaderContainer: {marginBottom: 20},
    signIn: {
      ...typography.bold(20, colors.black),
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
  });
};
