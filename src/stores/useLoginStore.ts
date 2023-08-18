import {runInAction} from 'mobx';
import {useLocalObservable} from 'mobx-react-lite';
import {useAsyncStorage} from '../custom_hooks';
import {UserModal} from '../models/UserModal';
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
      loginStore.isLoading = true;
      /*setTimeout(() => {
        loginStore.isLoading = !loginStore.isLoading;
      }, 5000);
      auth.setIsLogin(true);*/
      try {
        const response = await request<UserModal>('post', AppStrings.login, {
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
            Utility.showToast('Login Success');
          });
        } else {
          Utility.showToast(response.msg);
        }
      } catch (err) {
        Utility.showToast('Something went wrong');
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
