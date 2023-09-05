import {runInAction} from 'mobx';
import {useLocalObservable} from 'mobx-react-lite';
import useApiService from '../network/useAPIService';
import AppStrings from '../utils/AppStrings';
import Utility from '../utils/Utility';
import {useNavigation} from '@react-navigation/native';
import {AuthStackProps} from '../navigation/AppNavigation';

const useForgotPasswordStore = () => {
  const {request} = useApiService();
  const navigation = useNavigation<AuthStackProps>();
  const forgotStore = useLocalObservable(() => ({
    isLoading: false,
    isButtonEnabled: false,
    phoneNumber: '',

    setPhoneNumber(value: string) {
      forgotStore.phoneNumber = value;
      forgotStore.validateSubmit();
    },
    validateSubmit() {
      forgotStore.isButtonEnabled = false;
      if (
        Utility.validatePhoneNumber(forgotStore.phoneNumber) ||
        Utility.validateEmail(forgotStore.phoneNumber)
      ) {
        forgotStore.isButtonEnabled = true;
      }
      return;
    },

    async handleSubmit() {
      runInAction(() => {
        forgotStore.isLoading = true;
      });
      try {
        const response: any = await request(
          'get',
          AppStrings.forgetPassword(forgotStore.phoneNumber),
        );
        if (response.success) {
          Utility.showToast(response.msg);
          navigation.navigate('OTP', {
            data: forgotStore.phoneNumber,
            id: response.data.id,
          });
        } else {
          Utility.showToast(response.msg);
        }
      } catch (err) {
        Utility.showToast(AppStrings.somethingWentWrong);
      } finally {
        runInAction(() => {
          forgotStore.isLoading = false;
        });
      }
    },
  }));

  return forgotStore;
};

export default useForgotPasswordStore;
