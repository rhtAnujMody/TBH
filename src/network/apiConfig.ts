import axios from 'axios';
import {ApiResponse} from './useAPIService';

const apiInstance = axios.create({
  baseURL:
    'https://31a6-2405-201-4041-b074-788d-4c80-ce2e-cfc4.ngrok-free.app/api/',
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
    const apiError: ApiResponse<null> = {
      data: null,
      status: error.response?.status || 0,
      msg: error.response?.data?.message || 'An error occurred',
      success: false,
    };
    return Promise.reject(apiError);
  },
);

export default apiInstance;
