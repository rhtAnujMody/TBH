import {runInAction} from 'mobx';
import {useLocalObservable} from 'mobx-react-lite';
import {useAsyncStorage} from '../custom_hooks';
import {LoginModel, UserModal} from '../models/UserModal';
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

    setEmail(value: string) {
      signUpStore.userEmail = value;
      signUpStore.validateCredentials();
    },

    setName(value: string) {
      signUpStore.name = value;
      signUpStore.validateCredentials();
    },

    setDOB(value: string) {
      signUpStore.dob = value;
      signUpStore.validateCredentials();
    },

    setPassword(value: string) {
      signUpStore.password = value;
      signUpStore.validateCredentials();
    },

    validateCredentials() {
      signUpStore.isButtonEnabled = false;

      if (signUpStore.name.length === 0 || signUpStore.dob.length === 0) {
        return;
      }

      if (!Utility.validateEmail(signUpStore.userEmail)) {
        return;
      }
      if (signUpStore.password.length < 4) {
        return;
      }
      signUpStore.isButtonEnabled = true;
    },

    async signUp() {
      runInAction(() => {
        signUpStore.isLoading = true;
      });
      try {
        const response = await request<UserModal>('post', AppStrings.signUp, {
          name: this.name,
          dob: this.dob,
          email: this.userEmail,
          password: this.password,
        });
        if (response.success) {
          setData(AppStrings.isLogin, true);
          setData(AppStrings.userData, response.data);
          if (response.data) {
            auth.setUserData(response.data);
          }
          auth.setIsLogin(true, () => {
            Utility.showToast('SignUp Success');
          });
        } else {
          Utility.showToast(response.msg);
        }
      } catch (err) {
        Utility.showToast('Something went wrong');
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
