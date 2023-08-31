import {RouteProp, useRoute} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import {StyleSheet, Text, View} from 'react-native';
import {AppSVGs} from '../assets';
import {AppBack, AppButton, AppContainer} from '../components';
import {useKeyboard} from '../custom_hooks';
import {colors, typography} from '../theme';
import React = require('react');
import {AppOTPInput} from '../components/common/AppOTPInput';
import useOTPStore from '../stores/useOTPStore';
import {AuthStackParamList} from '../navigation/AuthStack';

const OTPScreen = () => {
  const keyboard = useKeyboard();
  const styles = loginStyles(keyboard);
  const otpStore = useOTPStore();
  const route = useRoute<RouteProp<AuthStackParamList, 'OTP'>>();
  const {data, id} = route.params;

  const handleOnSubmitEditing = () => {};

  const ShowButton = observer(() => {
    return (
      <AppButton
        title="Submit"
        isLoading={otpStore.isLoading}
        onPress={() => {
          otpStore.handleSubmit(id);
        }}
        enabled={otpStore.isButtonEnabled}
      />
    );
  });

  return (
    <AppContainer style={styles.container}>
      <AppBack />
      <View style={styles.headerContainer}>
        <View style={styles.logoContainer}>
          <AppSVGs.otp style={styles.logo} />
        </View>
      </View>

      <View style={styles.textInputContainer}>
        <View style={styles.signInHeaderContainer}>
          <Text style={styles.signIn}>Enter OTP</Text>
          <Text style={styles.signInDesc}>
            {'A 4 digit code has been sent to\n' + data}
          </Text>
        </View>

        <AppOTPInput
          length={4}
          value={otpStore.otp}
          disabled={otpStore.isButtonEnabled}
          onChange={value => {
            otpStore.setOTP(value);
          }}
        />

        <View style={styles.bottomContainer}>
          <ShowButton />
        </View>
      </View>
    </AppContainer>
  );
};

export default OTPScreen;

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
    borderStyleBase: {
      width: 30,
      height: 45,
    },

    borderStyleHighLighted: {
      borderColor: '#03DAC6',
    },

    underlineStyleBase: {
      width: 30,
      height: 45,
      borderWidth: 0,
      borderBottomWidth: 1,
    },

    underlineStyleHighLighted: {
      borderColor: '#03DAC6',
    },
  });
};
