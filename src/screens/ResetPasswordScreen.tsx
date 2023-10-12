import {RouteProp, useRoute} from '@react-navigation/native';
import {Observer, observer} from 'mobx-react-lite';
import React = require('react');
import {useRef} from 'react';
import {Text, TextInput, View} from 'react-native';

import {AppSVGs} from '../assets';
import {AppBack, AppButton, AppContainer, AppTextInput} from '../components';
import {useKeyboard} from '../custom_hooks';
import {useResetStore} from '../stores';
import {AuthStackParamList} from '../navigation/AuthStack';
import {loginStyles} from '../styles/loginStyles';
import AppStrings from '../utils/AppStrings';

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
        title={AppStrings.reset}
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

          <View style={styles.otpTextInputContainer}>
            <View style={styles.forgotHeaderContainer}>
              <Text style={styles.resetSignIn}>{AppStrings.resetPassword}</Text>
              <Text style={styles.forgotSignInDesc}>
                {AppStrings.enterNewPassword}
              </Text>
            </View>

            <AppTextInput
              icon={AppSVGs.lock}
              placeHolder={AppStrings.newPassword}
              returnKeyType="done"
              inputRef={emailRef}
              secureTextEntry
              onChangeText={resetStore.setNewPassword}
            />
            <AppTextInput
              icon={AppSVGs.lock}
              placeHolder={AppStrings.confirmPassword}
              returnKeyType="done"
              inputRef={passwordRef}
              secureTextEntry
              onChangeText={resetStore.setConfirmPWD}
            />

            <View style={styles.otpBottomContainer}>
              <ShowButton />
            </View>
          </View>
        </AppContainer>
      )}
    </Observer>
  );
};

export default ResetPasswordScreen;
