import AsyncStorage from '@react-native-async-storage/async-storage';
import {makeAutoObservable} from 'mobx';
import {UserData} from '../models';
import Utility from '../utils/Utility';

const authStore = {
  isLoggedIn: false,
  showSplash: true,
  userData: {} as UserData,

  setIsLogin(value: boolean, cb?: () => void) {
    this.isLoggedIn = value;
    if (cb) {
      cb();
    }
  },
  setUserData(data: UserData) {
    Utility.logData(data);
    authStore.userData = data;
  },
  toggleSplash(value: boolean) {
    authStore.showSplash = value;
  },

  logout() {
    AsyncStorage.clear();
    authStore.isLoggedIn = false;
  },
};

makeAutoObservable(authStore);

export default authStore;
