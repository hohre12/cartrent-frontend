import axios, { AxiosResponse, AxiosError } from 'axios';
import { TOKEN_KEY } from '../constants/common';
import LocalStorage from '../utils/localStorage';

// 정상적인 API response
const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

// 에러 API response
const onErrorResponse = (error: AxiosError): Promise<AxiosError> => {
  try {
    const { status, data } = error.response as AxiosResponse;
    switch (status) {
      case 401:
        if (data.error.code === 'EA001') {
        //   triggerDupErrorHandler();
        } else {
          LocalStorage.removeItem(TOKEN_KEY);
          window.location.replace('/login');
        }
        break;
      case 404:
        // TODO
        console.warn(data.msg);
        break;
      default:
        // TODO
        break;
    }
    return Promise.reject(error);
  } catch (error) {
    return Promise.reject(error);
  }
};

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  timeout: 30000,
});

export const setAuth = (token: string) => {
  axiosInstance.defaults.headers['Authorization'] = `Bearer ${token}`;
};

axiosInstance.interceptors.request.use((config) => {
  const token = LocalStorage.getItem(TOKEN_KEY);
  if (token && !config.headers['Authorization']) {
    config.headers['Authorization'] = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(onResponse, onErrorResponse);

export default axiosInstance;
