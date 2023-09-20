import {colors, typography} from '../theme';
import {StyleSheet} from 'react-native';

export const loginStyles = (isKeyboardVisible: boolean) => {
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
    bodyScroll: {
      flexGrow: 1,
      width: '80%',
    },
    signUp: {
      color: colors.palette.primary,
    },
    flexEnd: {
      alignSelf: 'flex-end',
    },

    //SignUp Screen

    headerContainer2: {
      flex: isKeyboardVisible ? 0.4 : 0.4,
      justifyContent: 'center',
    },
    bottomContainer2: {
      width: '100%',
      bottom: 20,
      justifyContent: 'center',
      alignItems: 'center',
    },
    dontHaveAcc2: {
      ...typography.medium(14),
      marginTop: 20,
      marginBottom: 20,
    },

    //Forgot Password Screen

    signInHeaderContainer2: {
      marginBottom: 20,
    },

    signIn2: {
      ...typography.bold(20, colors.black),
    },

    signInDesc2: {
      ...typography.regular(13),
    },

    //OTP Screen
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

    bottomContainer3: {
      width: '100%',
      position: 'absolute',
      bottom: 20,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
    },
    textInputContainer2: {
      flex: 1,
      marginTop: 20,
      backgroundColor: 'white',
      borderTopRightRadius: 40,
      borderTopLeftRadius: 40,
      paddingHorizontal: 30,
      paddingTop: 30,
    },

    //Reset Password
    signIn3: {
      ...typography.bold(20, colors.black),
      width: '100%',
    },
  });
};
