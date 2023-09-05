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
    age: '0',
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
        console.log(id, 'id');
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
              response.data.age &&
                genStore.setAge(response.data.age.toString());
              response.data.bmi &&
                genStore.setBMI(response.data.bmi.toString());
              response.data.weight_development &&
                response.data.weight_development &&
                genStore.setWeightDev(
                  response.data.weight_development.toString(),
                );
              response.data.height_development &&
                genStore.setHeightDev(
                  response.data.height_development.toString(),
                );
              response.data.overall_development &&
                genStore.setOverAllDev(
                  response.data.overall_development.toString(),
                );
              response.data.weight_gain &&
                genStore.setWeightGain(response.data.weight_gain.toString());
            });
          } else {
            Utility.showToast('No Data to show');
          }
        }
      } catch (err) {
        console.log(err, 'hello');
        Utility.showToast('Something went wrong');
      } finally {
        runInAction(() => {});
      }
    },
  }));

  return genStore;
};

export default useGenerateStore;
