import AsyncStorage from '@react-native-async-storage/async-storage';
import AppStrings from '../utils/AppStrings';

type DataType<T> = T | null;

const useAsyncStorage = () => {
  // Function to fetch data from AsyncStorage
  const getData = async <T>(
    key: string,
    initialValue: DataType<T>,
  ): Promise<DataType<T>> => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue !== null ? JSON.parse(jsonValue) : initialValue;
    } catch (error) {
      console.error(AppStrings.asyncRetrieveError, error);
      return initialValue;
    }
  };
  // Function to set data to AsyncStorage
  const setData = async <T>(key: string, value: DataType<T>): Promise<void> => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error(AppStrings.asyncSaveError, error);
    }
  };

  return {getData, setData};
};

export default useAsyncStorage;
