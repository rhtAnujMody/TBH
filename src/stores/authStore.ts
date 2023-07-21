import {makeAutoObservable, runInAction} from 'mobx';

const authStore = {
  isLoggedIn: true,
  isLoading: false,
  isButtonEnables: false,

  setIsLogin(value: boolean) {
    this.isLoggedIn = value;
  },

  logout() {
    // Simulate logout process
    setTimeout(() => {
      runInAction(() => {
        this.isLoggedIn = false;
      });
    }, 1000);
  },
};

makeAutoObservable(authStore);

export default authStore;
