import {useLocalObservable} from 'mobx-react-lite';
import authStore from './authStore';
import {runInAction} from 'mobx';
import useApiService from '../network/useAPIService';
import AppStrings from '../utils/AppStrings';
import Utility from '../utils/Utility';
import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {DoctorStackRootParamList} from '../navigation/DoctorStack';

const useDoctorStore = () => {
  const {request} = useApiService();
  const navigation =
    useNavigation<NativeStackNavigationProp<DoctorStackRootParamList>>();
  const doctorStore = useLocalObservable(() => ({
    index: 1,
    bottomSheetArray: [] as any[],
    bottomSheetHeader: '',
    openBottomSheet: false,
    hospital: '',
    action: '',
    others: '',
    isLoading: false,
    enableSubmit: true,
    checkedList: [] as number[],
    doctor_observation: authStore.userData.doctor_observation ?? [],

    hospitalOptions: [
      {name: 'Yes', id: '1'},
      {name: 'No', id: '2'},
    ],
    setAction(value: string) {
      doctorStore.action = value;
    },
    setOthers(value: string) {
      doctorStore.others = value;
    },
    toggleBottomSheet(from?: string) {
      doctorStore.openBottomSheet = !doctorStore.openBottomSheet;
      switch (from) {
        case 'hospital':
          doctorStore.bottomSheetHeader = 'Referred to Hospital/ Medical Care';
          doctorStore.bottomSheetArray = doctorStore.hospitalOptions;
          break;
      }
    },
    setValue(from: string, value: string, id: string) {
      doctorStore.openBottomSheet = !doctorStore.openBottomSheet;
      switch (from) {
        case 'Referred to Hospital/ Medical Care':
          doctorStore.hospital = value;
          break;
      }
    },
    async saveData(id: string) {
      runInAction(() => {
        doctorStore.isLoading = true;
      });
      try {
        const responseJson = await request(
          'post',
          AppStrings.doctorObservation,
          {
            child_id: id,
            observation: doctorStore.checkedList,
            others: doctorStore.others,
            is_referred_to_hospital: doctorStore.hospital === 'Yes',
            action_suggested:
              doctorStore.hospital === 'Yes' && doctorStore.action,
          },
        );

        if (responseJson.success) {
          Utility.showToast(responseJson.msg);
        } else {
          Utility.showToast(responseJson.msg);
        }
        navigation.goBack();
      } catch (err) {
        Utility.showToast('Something went wrong');
      } finally {
        runInAction(() => {
          doctorStore.isLoading = false;
        });
      }
    },
  }));
  return doctorStore;
};

export default useDoctorStore;
