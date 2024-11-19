// src/utils/axiosConfig.ts
import axios from 'axios';
import AuthService from '../services/AuthService';

axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      AuthService.logout();
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);