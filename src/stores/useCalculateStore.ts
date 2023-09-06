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
    toggleBottomSheet() {
      calStore.openBottomSheet = !calStore.openBottomSheet;
    },

    setValue(from: string, value: string, id: string) {
      calStore.openBottomSheet = !calStore.openBottomSheet;
      navigation.navigate('Generate', {id: id});
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

    generateName(value: any) {
      return value.map((item: any) => ({
        name: `Name: ${item.name}, DOB: ${item.dob}, Gender: ${item.gender}`,
        id: item.id.toString(),
      }));
    },

    async handleSubmit() {
      runInAction(() => {
        calStore.isLoading = true;
      });
      try {
        const responseJson: any = await request(
          'get',
          AppStrings.calculateFields(
            calStore.childName,
            calStore.dob,
            calStore.contact,
          ),
        );

        if (responseJson.success) {
          if (responseJson.data.length === 1) {
            navigation.navigate('Generate', {id: responseJson.data[0].id});
          } else {
            runInAction(() => {
              calStore.bottomSheetHeader = 'Select Child';
              calStore.bottomSheetArray = calStore.generateName(
                responseJson.data,
              );
              calStore.toggleBottomSheet();
            });
          }
        } else {
          Utility.showToast(responseJson.msg);
        }
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