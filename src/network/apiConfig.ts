import axios from 'axios';
import {ApiResponse} from './useAPIService';

const apiInstance = axios.create({
  baseURL:
    'https://0957-2405-201-4041-b074-2d2f-89f1-d5b7-8221.ngrok-free.app/api/',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
  responseType: 'json',
});

apiInstance.interceptors.response.use(
  response => {
    // Modify the response data if needed
    // For example, you can extract the response data from the server's response format
    // and return only the data to the application

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
