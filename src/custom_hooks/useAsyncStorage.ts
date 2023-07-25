import AsyncStorage from '@react-native-async-storage/async-storage';

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
      console.error('Error retrieving data from AsyncStorage:', error);
      return initialValue;
    }
  };
  // Function to set data to AsyncStorage
  const setData = async <T>(key: string, value: DataType<T>): Promise<void> => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
    } catch (error) {
      console.error('Error saving data to AsyncStorage:', error);
    }
  };

  return {getData, setData};
};

export default useAsyncStorage;
