import React, {useRef, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {AppSVGs} from '../assets';
import AppBack from '../components/common/AppBack';
import AppButton from '../components/common/AppButton';
import AppContainer from '../components/common/AppContainer';
import AppTextInput from '../components/common/AppTextInput';
import useKeyboard from '../custom_hooks/useKeyboard';
import {colors, typography} from '../theme';
import Utility from '../utils/Utility';
import {useNavigation} from '@react-navigation/native';
import {AuthStackProps} from '../navigation/AppNavigation';
import useSignUpStore from '../stores/useSignUpStore';
import {observer} from 'mobx-react-lite';

const SignUpScreen = () => {
  const keyboard = useKeyboard();
  const styles = loginStyles(keyboard);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);

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
    <AppContainer style={styles.container}>
      <AppBack />
      <View style={styles.headerContainer}>
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
        <AppTextInput
          icon={AppSVGs.name}
          placeHolder="Name"
          returnKeyType="next"
          onChangeText={signUpStore.setName}
          onSubmitEditing={() => handleOnSubmitEditing(1)}
        />
        <AppTextInput
          icon={AppSVGs.email}
          placeHolder="Email"
          returnKeyType="next"
          onChangeText={signUpStore.setEmail}
          inputRef={emailRef}
          onSubmitEditing={() => handleOnSubmitEditing(2)}
        />

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
        <View style={styles.bottomContainer}>
          <Text style={styles.dontHaveAcc}>
            Already have account?
            <Text style={styles.signUp} onPress={navigateToSignIn}>
              {' Sign In'}
            </Text>
          </Text>
          <ShowButton />
        </View>
      </View>
      <DatePicker
        modal
        date={new Date()}
        open={openDatePicker}
        mode="date"
        onConfirm={onConfirmDate}
        onCancel={onCancelDate}
      />
    </AppContainer>
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
