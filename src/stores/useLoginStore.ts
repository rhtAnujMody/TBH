import {useLocalObservable} from 'mobx-react-lite';
import Utility from '../utils/Utility';

import {LoginModel} from '../models/LoginModel';
import useApiService from '../network/useAPIService';
import authStore from './authStore';
import {runInAction} from 'mobx';
import reactotron from 'reactotron-react-native';

const useLoginStore = () => {
  const auth = authStore;
  const {request} = useApiService();

  const loginStore = useLocalObservable(() => ({
    isLoggedIn: false,
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
        return;
      }
      if (loginStore.password.length < 4) {
        return;
      }
      loginStore.isButtonEnabled = true;
    },

    async login() {
      runInAction(() => {
        loginStore.isLoading = true;
      });
      try {
        const response = await request<LoginModel>('GET', 'login');
        console.tron.log('login response', typeof response);
        if (response.success) {
          auth.setIsLogin(true);
        } else {
          console.tron.log('error');
        }
      } catch (err) {
      } finally {
        runInAction(() => {
          loginStore.isLoading = false;
        });
      }
    },

    logout() {
      // Simulate logout process
      setTimeout(() => {
        loginStore.isLoggedIn = false;
      }, 1000);
    },
  }));

  return loginStore;
};

export default useLoginStore;
