import {runInAction} from 'mobx';
import {useLocalObservable} from 'mobx-react-lite';
import useApiService from '../network/useAPIService';
import AppStrings from '../utils/AppStrings';
import Utility from '../utils/Utility';
import {useNavigation} from '@react-navigation/native';
import {AuthStackProps} from '../navigation/AppNavigation';

const useResetStore = () => {
  const {request} = useApiService();
  const navigation = useNavigation<AuthStackProps>();

  const resetStore = useLocalObservable(() => ({
    isLoading: false,
    isButtonEnabled: false,
    newPassword: '',
    confirmPwd: '',

    setNewPassword(value: string) {
      resetStore.newPassword = value;
      resetStore.validateSubmit();
    },

    setConfirmPWD(value: string) {
      resetStore.confirmPwd = value;
      resetStore.validateSubmit();
    },

    validateSubmit() {
      resetStore.isButtonEnabled = false;
      if (resetStore.newPassword === '') {
        return;
      }
      if (resetStore.newPassword !== resetStore.confirmPwd) {
        return;
      }
      resetStore.isButtonEnabled = true;
    },

    async handleSubmit(id: string) {
      runInAction(() => {
        resetStore.isLoading = true;
      });
      try {
        const response = await request('post', AppStrings.requestOTP, {
          user_id: id,
          new_password: resetStore.confirmPwd,
        });
        if (response.success) {
          Utility.showToast(response.msg);
          navigation.navigate('Login');
        } else {
          Utility.showToast(response.msg);
        }
      } catch (err) {
        Utility.showToast(AppStrings.somethingWentWrong);
      } finally {
        runInAction(() => {
          resetStore.isLoading = false;
        });
      }
    },
  }));

  return resetStore;
};

export default useResetStore;
