import {useNavigation} from '@react-navigation/native';
import {Observer, observer} from 'mobx-react-lite';
import React, {useRef, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import {AppSVGs} from '../assets';
import AppBack from '../components/common/AppBack';
import AppButton from '../components/common/AppButton';
import AppContainer from '../components/common/AppContainer';
import AppTextInput from '../components/common/AppTextInput';
import useKeyboard from '../custom_hooks/useKeyboard';
import {AuthStackProps} from '../navigation/AppNavigation';
import useSignUpStore from '../stores/useSignUpStore';
import {colors, typography} from '../theme';
import Utility from '../utils/Utility';
import AppStrings from '../utils/AppStrings';

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
        title={AppStrings.loginSignUp}
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
          <View style={styles.headerContainer}>
            <View style={styles.logoContainer}>
              <AppSVGs.logo style={styles.logo} />
            </View>
            <View style={styles.signInHeaderContainer}>
              <Text style={styles.signIn}>{AppStrings.signUpRegister}</Text>
              <Text style={styles.signInDesc}>{AppStrings.signUpTitle}</Text>
            </View>
          </View>

          <View style={styles.textInputContainer}>
            <AppTextInput
              icon={AppSVGs.name}
              placeHolder={AppStrings.signUpNamePlaceholder}
              returnKeyType="next"
              value={signUpStore.name}
              onChangeText={signUpStore.setName}
              onSubmitEditing={() => handleOnSubmitEditing(1)}
            />
            <AppTextInput
              icon={AppSVGs.email}
              placeHolder={AppStrings.loginEmailPlaceholder}
              returnKeyType="next"
              value={signUpStore.userEmail}
              onChangeText={signUpStore.setEmail}
              inputRef={emailRef}
              onSubmitEditing={() => handleOnSubmitEditing(2)}
            />

            <Observer>
              {() => (
                <AppTextInput
                  placeHolder={AppStrings.signUpPhoneNoPlaceholder}
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
              placeHolder={AppStrings.signUpDOBPlaceholder}
              hideInput={true}
              onPress={onDOBPress}
              otherText={dob}
            />

            <AppTextInput
              icon={AppSVGs.lock}
              secureTextEntry
              placeHolder={AppStrings.loginPasswordPlaceholder}
              onChangeText={signUpStore.setPassword}
              returnKeyType="done"
              inputRef={passwordRef}
            />
            <View style={styles.bottomContainer}>
              <Text style={styles.dontHaveAcc}>
                {AppStrings.alreadyHaveAccount}
                <Text style={styles.signUp} onPress={navigateToSignIn}>
                  {AppStrings.loginSignUp}
                </Text>
              </Text>
              <ShowButton />
            </View>
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

const loginStyles = (isKeyboardVisible: boolean) => {
  return StyleSheet.create({
    container: {
      backgroundColor: colors.palette.primary,
    },
    headerContainer: {
      flex: isKeyboardVisible ? 0.4 : 0.4,
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
      flex: 1,
      justifyContent: 'flex-end',
      marginHorizontal: 40,
    },
    signIn: {
      ...typography.bold(24, colors.black),
    },
    signInDesc: {
      ...typography.medium(15),
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
