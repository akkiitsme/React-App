import axios from 'axios';
import { store } from './store';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8081/users',
});

// Add Authorization header Interceptor
axiosInstance.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
 // console.log("token: "+token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;