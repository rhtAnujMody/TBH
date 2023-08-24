import {runInAction} from 'mobx';
import {useLocalObservable} from 'mobx-react-lite';
import {useAsyncStorage} from '../custom_hooks';
import {UserData} from '../models/UserModal';
import useApiService from '../network/useAPIService';
import AppStrings from '../utils/AppStrings';
import Utility from '../utils/Utility';
import authStore from './authStore';

const useLoginStore = () => {
  const auth = authStore;
  const {request} = useApiService();
  const {setData} = useAsyncStorage();

  const loginStore = useLocalObservable(() => ({
    isLoading: false,
    isButtonEnabled: false,
    userEmail: '',
    password: '',

    setEmail(value: string) {
      loginStore.userEmail = value;
      loginStore.validateCredentials();
    },

    setPassword(value: string) {
      loginStore.password = value;
      loginStore.validateCredentials();
    },

    validateCredentials() {
      loginStore.isButtonEnabled = false;
      if (!Utility.validateEmail(loginStore.userEmail)) {
        //Utility.showToast(AppStrings.invalidEmail);
        return;
      }
      if (loginStore.password.length < 6) {
        //Utility.showToast(AppStrings.invalidPassword);
        return;
      }
      loginStore.isButtonEnabled = true;
    },

    async login() {
      runInAction(() => {
        loginStore.isLoading = true;
      });
      try {
        const response = await request<UserData>('post', AppStrings.login, {
          email: this.userEmail,
          password: this.password,
        });
        if (response.success) {
          Utility.logData(response.data);
          setData(AppStrings.isLogin, true);
          setData(AppStrings.userData, response.data);
          if (response.data) {
            Utility.logData(response.data);
            auth.setUserData(response.data);
          }
          auth.setIsLogin(true, () => {
            Utility.showToast('Login Success');
          });
        } else {
          Utility.showToast(response.msg);
        }
      } catch (err: unknown) {
        if (typeof err === 'string') {
          err.toUpperCase();
          Utility.showToast(err.toUpperCase()); // works, `e` narrowed to string
        } else if (err instanceof Error) {
          err.message;
          Utility.showToast(err.message); // works, `e` narrowed to Error
        }
      } finally {
        runInAction(() => {
          loginStore.isLoading = false;
        });
      }
    },
  }));

  return loginStore;
};

export default useLoginStore;
