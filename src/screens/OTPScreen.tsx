import {RouteProp, useRoute} from '@react-navigation/native';
import {observer} from 'mobx-react-lite';
import {Text, View} from 'react-native';
import React = require('react');

import {AppSVGs} from '../assets';
import {AppBack, AppButton, AppContainer, AppOTPInput} from '../components';
import {useKeyboard} from '../custom_hooks';
import {loginStyles} from '../styles/loginStyles';

import {useOTPStore} from '../stores';
import {AuthStackParamList} from '../navigation/AuthStack';

const OTPScreen = () => {
  const keyboard = useKeyboard();
  const styles = loginStyles(keyboard);
  const otpStore = useOTPStore();
  const route = useRoute<RouteProp<AuthStackParamList, 'OTP'>>();
  const {data, id} = route.params;

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

      <View style={styles.otpTextInputContainer}>
        <View style={styles.forgotHeaderContainer}>
          <Text style={styles.forgotSignIn}>Enter OTP</Text>
          <Text style={styles.forgotSignInDesc}>
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

        <View style={styles.otpBottomContainer}>
          <ShowButton />
        </View>
      </View>
    </AppContainer>
  );
};

export default OTPScreen;
