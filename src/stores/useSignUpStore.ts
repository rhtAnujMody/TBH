import {runInAction} from 'mobx';
import {useLocalObservable} from 'mobx-react-lite';
import {useAsyncStorage} from '../custom_hooks';
import {UserData} from '../models/UserModal';
import useApiService from '../network/useAPIService';
import AppStrings from '../utils/AppStrings';
import Utility from '../utils/Utility';
import authStore from './authStore';

const useSignUpStore = () => {
  const auth = authStore;
  const {request} = useApiService();
  const {setData} = useAsyncStorage();

  const signUpStore = useLocalObservable(() => ({
    isLoading: false,
    isButtonEnabled: false,
    name: '',
    dob: '',
    userEmail: '',
    password: '',
    phoneNumber: '',

    setEmail(value: string) {
      if (value.endsWith(' ')) {
        return;
      }
      signUpStore.userEmail = value;
      signUpStore.validateCredentials();
    },

    setName(value: string) {
      if (!(value.trim() === '') && !Utility.validateAlpha(value)) {
        return;
      }
      signUpStore.name = value;
      signUpStore.validateCredentials();
    },

    setDOB(value: string) {
      signUpStore.dob = value;
      signUpStore.validateCredentials();
    },
    setNumber(value: string) {
      if (!(value.trim() === '') && !Utility.validateNumeric(value)) {
        return;
      }
      signUpStore.phoneNumber = value;
      signUpStore.validateCredentials();
    },

    setPassword(value: string) {
      signUpStore.password = value;
      signUpStore.validateCredentials();
    },

    validateCredentials() {
      signUpStore.isButtonEnabled = false;

      if (
        signUpStore.name.length === 0 ||
        signUpStore.userEmail.length === 0 ||
        signUpStore.password.length === 0 ||
        signUpStore.phoneNumber.length === 0 ||
        signUpStore.dob.length === 0
      ) {
        return;
      }

      if (!Utility.validateEmail(signUpStore.userEmail)) {
        //Utility.showToast(AppStrings.invalidEmail);
        return;
      }
      if (signUpStore.password.length < 6) {
        //Utility.showToast(AppStrings.invalidPassword);
        return;
      }

      if (!Utility.validatePhoneNumber(signUpStore.phoneNumber)) {
        //Utility.showToast(AppStrings.invalidNumber);
        return;
      }
      signUpStore.isButtonEnabled = true;
    },

    async signUp() {
      runInAction(() => {
        signUpStore.isLoading = true;
      });
      try {
        const response = await request<UserData>('post', AppStrings.signUp, {
          name: signUpStore.name,
          dob: signUpStore.dob,
          email: signUpStore.userEmail,
          password: signUpStore.password,
          contact: signUpStore.phoneNumber,
        });
        if (response.success) {
          Utility.logData(response.data);
          setData(AppStrings.isLogin, true);
          setData(AppStrings.userData, response.data);
          if (response.data) {
            auth.setUserData(response.data);
          }
          auth.setIsLogin(true, () => {
            Utility.showToast(AppStrings.signUpSuccess);
          });
        } else {
          Utility.showToast(response.msg ?? AppStrings.somethingWentWrong);
        }
      } catch (err) {
        Utility.showToast(AppStrings.somethingWentWrong);
      } finally {
        runInAction(() => {
          signUpStore.isLoading = false;
        });
      }
    },
  }));

  return signUpStore;
};

export default useSignUpStore;
