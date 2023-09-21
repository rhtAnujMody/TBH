import {runInAction} from 'mobx';
import {useLocalObservable} from 'mobx-react-lite';
import useApiService from '../network/useAPIService';
import AppStrings from '../utils/AppStrings';
import Utility from '../utils/Utility';

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

    async handleSubmit(id: string) {
      runInAction(() => {});
      try {
        const response: any = await request('post', AppStrings.generateFields, {
          child_id: id,
        });

        if (response.success) {
          if (response.data) {
            runInAction(() => {
              response.data.vitamin_A
                ? genStore.setVitaminA('YES')
                : genStore.setVitaminA('NO');
              response.data.deworming
                ? genStore.setDeworm('YES')
                : genStore.setDeworm('NO');
              response.data.ifa
                ? genStore.setIFA('YES')
                : genStore.setIFA('NO');

              genStore.setAge(response.data.age.toString());
              genStore.setBMI(response.data.bmi.toString());
              genStore.setWeightDev(
                response.data.weight_development.toString(),
              );
              genStore.setHeightDev(
                response.data.height_development.toString(),
              );
              genStore.setOverAllDev(
                response.data.overall_development.toString(),
              );
              genStore.setWeightGain(response.data.weight_gain.toString());
            });
          } else {
            Utility.showToast('No Data to show');
          }
        }
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
