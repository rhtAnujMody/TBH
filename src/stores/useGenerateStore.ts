import {runInAction} from 'mobx';
import {useLocalObservable} from 'mobx-react-lite';
import useApiService from '../network/useAPIService';
import AppStrings from '../utils/AppStrings';
import Utility from '../utils/Utility';
import authStore from './authStore';

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

    setVitaminA(value: boolean) {
      value
        ? (genStore.vitaminA = AppStrings.yesCaps)
        : (genStore.vitaminA = AppStrings.noCaps);
    },
    setDeworm(value: boolean) {
      value
        ? (genStore.deworm = AppStrings.yesCaps)
        : (genStore.deworm = AppStrings.noCaps);
    },
    setIFA(value: boolean) {
      value
        ? (genStore.ifa = AppStrings.yesCaps)
        : (genStore.ifa = AppStrings.noCaps);
    },
    setAge(value: string) {
      genStore.age = value;
    },
    setBMI(value: number) {
      genStore.bmi = value.toFixed(2).toString();
    },
    setWeightDev(value: string) {
      value
        ? (genStore.weightDev = value)
        : (genStore.weightDev = AppStrings.na);
    },
    setHeightDev(value: string) {
      value
        ? (genStore.heightDev = value)
        : (genStore.heightDev = AppStrings.na);
    },
    setOverAllDev(value: string) {
      value
        ? (genStore.overAllDev = value)
        : (genStore.overAllDev = AppStrings.na);
    },
    setWeightGain(value: string) {
      genStore.weightGain = value;
    },

    async handleSubmit(id: string) {
      runInAction(() => {});
      try {
        const response: any = await request('post', AppStrings.generateFields, {
          child_id: id,
          agent_id: authStore.userData.id,
        });

        if (response.success) {
          if (response.data) {
            runInAction(() => {
              genStore.setVitaminA(response.data.vitamin_A);
              genStore.setDeworm(response.data.deworming);
              genStore.setIFA(response.data.ifa);
              genStore.setAge(response.data.age.toString());
              genStore.setBMI(response.data.bmi);
              genStore.setWeightDev(response.data.weight_development);
              genStore.setHeightDev(response.data.height_development);
              genStore.setOverAllDev(response.data.overall_development);
              genStore.setWeightGain(response.data.weight_gain.toString());
            });
          } else {
            Utility.showToast(AppStrings.noData);
          }
        }
      } catch (err) {
        Utility.showToast(AppStrings.somethingWentWrong);
      } finally {
        runInAction(() => {});
      }
    },
  }));

  return genStore;
};

export default useGenerateStore;
