import axios from 'axios';
import {ApiResponse} from './useAPIService';

const apiInstance = axios.create({
  baseURL:
    'https://bb52-2405-201-4041-b074-b88d-f404-7d0-fee7.ngrok-free.app/api/',
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
