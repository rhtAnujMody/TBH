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
    errorMessage: '',

    setErrorMessage(value: string) {
      forgotStore.errorMessage = value;
    },

    setPhoneNumber(value: string) {
      forgotStore.phoneNumber = value;
      forgotStore.validateSubmit();
    },
    validateSubmit() {
      if (
        !!Utility.validatePhoneNumber(forgotStore.phoneNumber) ||
        !!Utility.validateEmail(forgotStore.phoneNumber)
      ) {
        forgotStore.setErrorMessage('');
        forgotStore.isButtonEnabled = true;
        return;
      }
      forgotStore.isButtonEnabled = false;
      forgotStore.setErrorMessage(AppStrings.invalidPhoneEmail);
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
