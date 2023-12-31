import axios from 'axios';
import {ApiResponse} from './useAPIService';

const apiInstance = axios.create({
  baseURL: 'http://localhost:3001/',
  timeout: 5000,
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
