import {makeAutoObservable} from 'mobx';
import {UserModal} from '../models/UserModal';
import AsyncStorage from '@react-native-async-storage/async-storage';

const authStore = {
  isLoggedIn: false,
  showSplash: true,
  userData: {} as UserModal,

  setIsLogin(value: boolean, cb?: () => void) {
    this.isLoggedIn = value;
    if (cb) {
      cb();
    }
  },
  setUserData(data: UserModal) {
    this.userData = data;
  },
  toggleSplash(value: boolean) {
    this.showSplash = value;
  },

  logout() {
    AsyncStorage.clear();
    authStore.isLoggedIn = false;
  },
};

makeAutoObservable(authStore);

export default authStore;
