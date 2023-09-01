import {runInAction} from 'mobx';
import {useLocalObservable} from 'mobx-react-lite';
import useApiService from '../network/useAPIService';
import AppStrings from '../utils/AppStrings';
import Utility from '../utils/Utility';
import {useNavigation} from '@react-navigation/native';
import {AuthStackProps} from '../navigation/AppNavigation';

const useOTPStore = () => {
  const {request} = useApiService();
  const navigation = useNavigation<AuthStackProps>();

  const otpStore = useLocalObservable(() => ({
    isLoading: false,
    isButtonEnabled: false,
    otp: [] as string[],

    setOTP(value: string[]) {
      value.map((value, index) => {
        otpStore.otp[index] = value;
      });
      otpStore.validateSubmit();
    },

    getOTP() {
      let res = '';
      for (let i = 0; i < otpStore.otp.length; i++) {
        res = res + otpStore.otp[i];
      }
      return res;
    },

    validateSubmit() {
      otpStore.isButtonEnabled = false;
      for (let i = 0; i < otpStore.otp.length; i++) {
        if (otpStore.otp[i] == '') {
          return;
        }
      }
      otpStore.isButtonEnabled = true;
    },

    async handleSubmit(id: string) {
      runInAction(() => {
        otpStore.isLoading = true;
      });
      try {
        const response = await request('post', AppStrings.verifyOTP, {
          user_id: id,
          otp: otpStore.getOTP(),
        });
        if (response.success) {
          Utility.showToast(response.msg);
          navigation.navigate('Reset', {id: id});
        } else {
          Utility.showToast(response.msg);
        }
      } catch (err) {
        Utility.showToast(AppStrings.somethingWentWrong);
      } finally {
        runInAction(() => {
          otpStore.isLoading = false;
        });
      }
    },
  }));

  return otpStore;
};

export default useOTPStore;
