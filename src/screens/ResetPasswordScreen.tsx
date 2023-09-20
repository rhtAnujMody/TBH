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
import {loginStyles} from '../styles/loginStyles';

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
            <View style={styles.signInHeaderContainer2}>
              <Text style={styles.signIn3}>Reset Password</Text>
              <Text style={styles.signInDesc2}>
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

            <View style={styles.bottomContainer3}>
              <ShowButton />
            </View>
          </View>
        </AppContainer>
      )}
    </Observer>
  );
};

export default ResetPasswordScreen;
