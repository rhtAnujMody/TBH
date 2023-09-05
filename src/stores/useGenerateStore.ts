import {runInAction} from 'mobx';
import {useLocalObservable} from 'mobx-react-lite';
import useApiService from '../network/useAPIService';
import AppStrings from '../utils/AppStrings';
import Utility from '../utils/Utility';
import {useNavigation} from '@react-navigation/native';

const useGenerateStore = () => {
  const {request} = useApiService();

  const genStore = useLocalObservable(() => ({
    vitaminA: '',
    deworm: '',
    ifa: '',
    age: '',
    bmi: '',
    weightDev: '',
    heightDev: '',
    overAllDev: '',
    weightGain: '',

    setVitaminA(value: string) {
      genStore.vitaminA = value;
    },
    setDeworm(value: string) {
      genStore.deworm = value;
    },
    setIFA(value: string) {
      genStore.ifa = value;
    },
    setAge(value: string) {
      genStore.age = value;
    },
    setBMI(value: string) {
      genStore.bmi = value;
    },
    setWeightDev(value: string) {
      genStore.weightDev = value;
    },
    setHeightDev(value: string) {
      genStore.heightDev = value;
    },
    setOverAllDev(value: string) {
      genStore.overAllDev = value;
    },
    setWeightGain(value: string) {
      genStore.weightGain = value;
    },

    async handleSubmit() {
      runInAction(() => {});
      try {
      } catch (err) {
        Utility.showToast('Something went wrong');
      } finally {
        runInAction(() => {});
      }
    },
  }));

  return genStore;
};

export default useGenerateStore;
