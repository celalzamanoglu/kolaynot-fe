import axios, { AxiosRequestConfig } from 'axios';
import * as AxiosLogger from 'axios-logger';
import { Platform } from 'react-native';

const getBaseUrl = () => {
  if (Platform.OS === 'android') {
    // Android emulator special case
    return 'http://10.0.2.2:3000';
  }
  // For iOS simulator and real devices, you might want to use your computer's IP
  return 'http://localhost:3000';
};

// Create axios instance with default config
const instance = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add logger interceptors with proper configuration
instance.interceptors.request.use(
  (request) => {
    return AxiosLogger.requestLogger(request, {
      dateFormat: 'HH:MM:ss',
    });
  },
  (error) => {
    return AxiosLogger.errorLogger(error);
  }
);

instance.interceptors.response.use(
  (response) => {
    return AxiosLogger.responseLogger(response, {
      dateFormat: 'HH:MM:ss',
    });
  },
  (error) => {
    return AxiosLogger.errorLogger(error);
  }
);

// Helper functions
export const getAxiosAuthHeader = (token: string) => `Bearer ${token}`;

export const setAxiosAuthHeader = (token: string) => {
  instance.defaults.headers.common.Authorization = getAxiosAuthHeader(token);
};

export const clearAxiosAuthHeader = () => {
  delete instance.defaults.headers.common.Authorization;
};

export const request = async <T>(config: AxiosRequestConfig): Promise<T> => {
  try {
    const response = await instance.request<T>(config);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw error.response?.data || error.message;
    }
    throw error;
  }
};

export default instance; 