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
    enableSubmit: false,
    doctorObservation: authStore.userData.doctor_observation,
    hospitalOptions: [
      {name: AppStrings.yes, id: '1'},
      {name: AppStrings.no, id: '2'},
    ],
    setAction(value: string) {
      doctorStore.action = value;
    },
    setOthers(value: string) {
      doctorStore.others = value;
    },
    toggleBottomSheet() {
      doctorStore.openBottomSheet = !doctorStore.openBottomSheet;
      doctorStore.bottomSheetHeader = AppStrings.referredHospital;
      doctorStore.bottomSheetArray = doctorStore.hospitalOptions;
    },
    setValue(from: string, value: string, id: string) {
      doctorStore.openBottomSheet = !doctorStore.openBottomSheet;
      doctorStore.hospital = value;
      doctorStore.validateSubmit();
    },
    validateSubmit() {
      doctorStore.enableSubmit = false;

      if (doctorStore.hospital === '') {
        return;
      }

      doctorStore.enableSubmit = true;
    },
    async saveData(id: string) {
      let selectedIds: number[] = [];
      runInAction(() => {
        doctorStore.isLoading = true;
      });

      Object.keys(doctorStore.doctorObservation).map(itemId => {
        doctorStore.doctorObservation[itemId].map(item => {
          if (item.isSelected) {
            selectedIds.push(item.id);
          }
        });
      });
      Utility.logData(selectedIds);
      try {
        const responseJson = await request(
          'post',
          AppStrings.doctorObservation,
          {
            child_id: id,
            observation: selectedIds,
            others: doctorStore.others,
            is_referred_to_hospital: doctorStore.hospital === 'Yes',
            action_suggested:
              doctorStore.hospital === 'Yes' ? doctorStore.action : null,
          },
        );

        if (responseJson.success) {
          Utility.showToast(responseJson.msg);
        } else {
          Utility.showToast(responseJson.msg);
        }
        navigation.goBack();
      } catch (err) {
        Utility.showToast(AppStrings.somethingWentWrong);
      } finally {
        Object.keys(doctorStore.doctorObservation).map(itemId => {
          doctorStore.doctorObservation[itemId].map(item => {
            item.isSelected = false;
          });
        });
        runInAction(() => {
          doctorStore.isLoading = false;
        });
      }
    },
  }));
  return doctorStore;
};

export default useDoctorStore;
