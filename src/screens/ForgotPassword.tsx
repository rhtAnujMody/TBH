import {observer} from 'mobx-react-lite';
import {useRef} from 'react';
import {Text, TextInput, View} from 'react-native';
import {AppSVGs} from '../assets';
import {AppBack, AppButton, AppContainer, AppTextInput} from '../components';
import {useKeyboard} from '../custom_hooks';
import {useForgotPasswordStore} from '../stores';
import React = require('react');
import {loginStyles} from '../styles/loginStyles';

const ForgotPassword = () => {
  const emailRef = useRef<TextInput>(null);
  const keyboard = useKeyboard();
  const styles = loginStyles(keyboard);
  const forgotStore = useForgotPasswordStore();
  const handleOnSubmitEditing = () => {};

  const ShowButton = observer(() => {
    return (
      <AppButton
        title="Send OTP"
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
        <View style={styles.signInHeaderContainer2}>
          <Text style={styles.signIn2}>Forgot Password?</Text>
          <Text style={styles.signInDesc2}>
            Please Enter Your Email ID/ Phone Number to Reset Password
          </Text>
        </View>
        <AppTextInput
          icon={AppSVGs.name}
          placeHolder="Email / Phone Number"
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
