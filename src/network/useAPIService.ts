import {Method} from 'axios';
import apiInstance from './apiConfig';

// Define the generic success and error response types
export interface ApiResponse<T> {
  data: T | null;
  status: number;
  msg: string;
  success: boolean;
}

// Custom hook for handling API calls
const useApiService = () => {
  // Function to make an API request
  const request = async <T>(
    method: Method,
    url: string,
    data?: any,
  ): Promise<ApiResponse<T>> => {
    try {
      const response = await apiInstance.request<ApiResponse<T>>({
        method,
        url,
        data,
      });
      console.tron.log('api response', typeof response.data);
      return response.data;
    } catch (error) {
      return Promise.reject(error);
    }
  };

  // Return the loading state and the request function
  return {request};
};

export default useApiService;
