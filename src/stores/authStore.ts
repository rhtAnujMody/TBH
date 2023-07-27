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
    authStore.showSplash = value;
  },

  logout() {
    authStore.isLoggedIn = false;
  },
};

makeAutoObservable(authStore);

export default authStore;
