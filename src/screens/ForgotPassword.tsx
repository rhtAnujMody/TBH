import {useNavigation} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import {useRef} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {AppSVGs} from '../assets';
import {AppBack, AppButton, AppContainer, AppTextInput} from '../components';
import {useKeyboard} from '../custom_hooks';
import {AuthStackProps} from '../navigation/AppNavigation';
import {colors, typography} from '../theme';
import React = require('react');

const ForgotPassword = () => {
  const emailRef = useRef<TextInput>(null);
  const keyboard = useKeyboard();
  const styles = loginStyles(keyboard);
  const navigation = useNavigation<AuthStackProps>();

  const handleOnSubmitEditing = () => {};

  const navigateToOTP = () => {
    navigation.navigate('OTP');
  };

  const ShowButton = observer(() => {
    return (
      <AppButton
        title="Send OTP"
        isLoading={false}
        onPress={navigateToOTP}
        enabled={true}
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
          <Text style={styles.signIn}>Forgot Password?</Text>
          <Text style={styles.signInDesc}>
            Please Enter Your Email ID/ Phone Number to Reset Password
          </Text>
        </View>
        <AppTextInput
          icon={AppSVGs.name}
          placeHolder="Email / Phone Number"
          returnKeyType="next"
          inputRef={emailRef}
          onChangeText={() => {}}
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
