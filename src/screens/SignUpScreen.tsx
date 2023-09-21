import {useNavigation} from '@react-navigation/native';
import {Observer, observer} from 'mobx-react-lite';
import React, {useRef, useState} from 'react';
import {Pressable, ScrollView, Text, TextInput, View} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import {AppSVGs} from '../assets';
import {
  AppBack,
  AppButton,
  AppContainer,
  AppTextInput,
} from '../components/common';
import {useKeyboard} from '../custom_hooks';
import {AuthStackProps} from '../navigation/AppNavigation';
import {useSignUpStore} from '../stores';
import {loginStyles} from '../styles/loginStyles';
import Utility from '../utils/Utility';

const SignUpScreen = () => {
  const keyboard = useKeyboard();
  const styles = loginStyles(keyboard);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const numberRef = useRef<TextInput>(null);

  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [dob, setDOB] = useState<string | undefined>(undefined);

  const signUpStore = useSignUpStore();

  const navigation = useNavigation<AuthStackProps>();

  const handleOnSubmitEditing = (type: number = 1) => {
    switch (type) {
      case 1:
        if (emailRef && emailRef.current) {
          emailRef.current.focus();
        }
        break;
      case 2:
        if (numberRef && numberRef.current) {
          numberRef.current.focus();
        }
        break;
      case 3:
        if (passwordRef && passwordRef.current) {
          passwordRef.current.focus();
        }
        break;
      default:
        break;
    }
  };

  const onDOBPress = () => {
    setOpenDatePicker(true);
  };

  const onConfirmDate = (date: Date) => {
    setDOB(Utility.formatDate(date));
    signUpStore.setDOB(Utility.formatDate(date, 'yyyy-MM-DD'));
    setOpenDatePicker(false);
  };
  const onCancelDate = () => {
    setOpenDatePicker(false);
  };
  const navigateToSignIn = () => {
    navigation.navigate('Login');
  };

  const ShowButton = observer(() => {
    return (
      <AppButton
        title="Sign Up"
        isLoading={signUpStore.isLoading}
        onPress={signUpStore.signUp}
        enabled={signUpStore.isButtonEnabled}
      />
    );
  });

  return (
    <Observer>
      {() => (
        <AppContainer style={styles.container}>
          <AppBack />
          <View style={styles.signUpHeaderContainer}>
            <View style={styles.logoContainer}>
              <AppSVGs.logo style={styles.logo} />
            </View>
            <View style={styles.signInHeaderContainer}>
              <Text style={styles.signIn}>Register</Text>
              <Text style={styles.signInDesc}>
                New to Decimal Foundation! Please Provide Details to Register
                Yourself
              </Text>
            </View>
          </View>

          <View style={styles.textInputContainer}>
            <ScrollView contentContainerStyle={styles.bodyScroll}>
              <Pressable>
                <AppTextInput
                  icon={AppSVGs.name}
                  placeHolder="Name"
                  returnKeyType="next"
                  value={signUpStore.name}
                  onChangeText={signUpStore.setName}
                  onSubmitEditing={() => handleOnSubmitEditing(1)}
                />
                <AppTextInput
                  icon={AppSVGs.email}
                  placeHolder="Email"
                  returnKeyType="next"
                  value={signUpStore.userEmail}
                  onChangeText={signUpStore.setEmail}
                  inputRef={emailRef}
                  onSubmitEditing={() => handleOnSubmitEditing(2)}
                />

                <Observer>
                  {() => (
                    <AppTextInput
                      placeHolder="Phone Number"
                      returnKeyType="next"
                      keyboardType="phone-pad"
                      maxLength={10}
                      leftText="+91"
                      value={signUpStore.phoneNumber}
                      onChangeText={signUpStore.setNumber}
                      inputRef={numberRef}
                      onSubmitEditing={() => handleOnSubmitEditing(3)}
                    />
                  )}
                </Observer>

                <AppTextInput
                  icon={AppSVGs.dob}
                  placeHolder="Date Of Birth"
                  hideInput={true}
                  onPress={onDOBPress}
                  otherText={dob}
                />

                <AppTextInput
                  icon={AppSVGs.lock}
                  secureTextEntry
                  placeHolder="Password"
                  onChangeText={signUpStore.setPassword}
                  returnKeyType="done"
                  inputRef={passwordRef}
                />
                <View style={styles.signUpBottomContainer}>
                  <Text style={styles.signUpDontHaveAcc}>
                    Already have an account?
                    <Text style={styles.signUp} onPress={navigateToSignIn}>
                      {' Sign In'}
                    </Text>
                  </Text>
                  <ShowButton />
                </View>
              </Pressable>
            </ScrollView>
          </View>

          <DateTimePickerModal
            isVisible={openDatePicker}
            mode="date"
            onConfirm={onConfirmDate}
            onCancel={onCancelDate}
            maximumDate={new Date()}
          />
        </AppContainer>
      )}
    </Observer>
  );
};

export default SignUpScreen;
