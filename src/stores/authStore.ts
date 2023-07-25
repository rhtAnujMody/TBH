import {makeAutoObservable} from 'mobx';

const authStore = {
  isLoggedIn: false,
  isLoading: false,
  showSplash: true,
  isButtonEnables: false,

  setIsLogin(value: boolean, cb?: () => void) {
    this.isLoggedIn = value;
    if (cb) {
      cb();
    }
  },
  toggleSplash(value: boolean) {
    this.showSplash = value;
  },

  logout() {},
};

makeAutoObservable(authStore);

export default authStore;
