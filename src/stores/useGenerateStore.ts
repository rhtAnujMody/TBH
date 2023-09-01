import {useLocalObservable} from 'mobx-react-lite';
import Utility from '../utils/Utility';
import {runInAction} from 'mobx';
import {Image} from 'react-native-image-crop-picker';
import AppStrings from '../utils/AppStrings';
import useApiService from '../network/useAPIService';
import {HealthModal} from '../models/HealthModal';
import authStore from './authStore';
import {useNavigation} from '@react-navigation/native';

const useGenerateStore = () => {
  const {request} = useApiService();

  const generateStore = useLocalObservable(() => ({
    vitaminA: '',
    deworm: '',
    ifa: '',
    age: '',

    async handleSubmit() {},
  }));

  return generateStore;
};

export default useGenerateStore;
