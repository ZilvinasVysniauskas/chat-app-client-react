import axios from 'axios';
import { LocalStorageKeys, headerNames } from '../constants';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (config) => {
    if (config.url?.startsWith('https://chat-app-file-storage')) {
      return config;
    }

    const idToken = localStorage.getItem(LocalStorageKeys.token);
    
    if (idToken) {
      config.headers[headerNames.authorization] = 'Bearer ' + idToken;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;