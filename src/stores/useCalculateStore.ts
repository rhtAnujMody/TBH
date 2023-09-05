import {runInAction} from 'mobx';
import {useLocalObservable} from 'mobx-react-lite';
import useApiService from '../network/useAPIService';
import AppStrings from '../utils/AppStrings';
import Utility from '../utils/Utility';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ReportsStackRootParamList} from '../navigation/ReportsStack';

const useCalculateStore = () => {
  const {request} = useApiService();
  const navigation =
    useNavigation<NativeStackNavigationProp<ReportsStackRootParamList>>();
  const calStore = useLocalObservable(() => ({
    dob: '',
    childName: '',
    contact: '',

    showCalender: false,

    isLoading: false,
    enableSubmit: false,

    bottomSheetArray: [] as any[],
    bottomSheetHeader: '',
    openBottomSheet: false,

    toogleCalender() {
      calStore.showCalender = !calStore.showCalender;
    },

    toggleBottomSheet(from?: string) {
      calStore.openBottomSheet = !calStore.openBottomSheet;
      switch (from) {
        case '':
          calStore.bottomSheetHeader = 'Select Child';
          calStore.bottomSheetArray = [];
          break;
      }
    },

    setValue(from: string, value: string, id: string) {
      calStore.openBottomSheet = !calStore.openBottomSheet;
      switch (from) {
        case 'Select Child':
          break;
      }
    },

    setChildame(value: string) {
      if (!(value.trim() == '') && !Utility.validateAlpha(value)) {
        return;
      }
      calStore.childName = value;
      calStore.validateSubmit();
    },

    setContact(value: string) {
      if (!(value.trim() == '') && !Utility.validateNumeric(value)) {
        return;
      }
      calStore.contact = value;
      calStore.validateSubmit();
    },

    setDOB(value: string) {
      calStore.dob = value;
      calStore.validateSubmit();
    },

    validateSubmit() {
      calStore.enableSubmit = false;
      if (calStore.dob == '') {
        return;
      }

      if (!Utility.validateAlpha(calStore.childName)) {
        return;
      }

      if (!Utility.validatePhoneNumber(calStore.contact)) {
        return;
      }

      calStore.enableSubmit = true;
    },

    async handleSubmit() {
      runInAction(() => {
        calStore.isLoading = true;
      });
      try {
        const responseJson = await request(
          'get',
          AppStrings.calculateFields(calStore.childName, '', calStore.contact),
        );
        navigation.navigate('Generate');
        console.log(responseJson);
      } catch (err) {
        Utility.showToast('Something went wrong');
      } finally {
        runInAction(() => {
          calStore.isLoading = false;
        });
      }
    },
  }));

  return calStore;
};

export default useCalculateStore;
