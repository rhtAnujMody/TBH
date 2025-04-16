import axios from 'axios';
import {ApiResponse} from './useAPIService';
import {authStore} from '../stores';
import AppStrings from '../utils/AppStrings';

const apiInstance = axios.create({
  baseURL: 'http://65.2.81.147:8000/api/',
  //'http://65.2.81.147:8000/api/',
  //http://10.0.2.2:8000/api/
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
  responseType: 'json',
});

apiInstance.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response.status === 404) {
      authStore.setIsLogin(false);
    }
    const apiError: ApiResponse<null> = {
      data: null,
      status: error.response?.status || 0,
      msg: error.response?.data?.message || AppStrings.errorOccured,
      success: false,
    };
    return Promise.reject(apiError);
  },
);

export default apiInstance;
