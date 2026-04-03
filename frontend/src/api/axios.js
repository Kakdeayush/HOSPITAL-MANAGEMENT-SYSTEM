import axios from 'axios';
import { getToken } from '../utils/auth';

const api = axios.create({
  baseURL: 'http://localhost:8080/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// 🔥 ADD TOKEN TO EVERY REQUEST
api.interceptors.request.use(
  (config) => {
    const token = getToken() || localStorage.getItem("token");

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 🔥 FIX: DO NOT AUTO LOGOUT ON 401
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn("401 Unauthorized - token issue or backend issue");
      // ❌ REMOVED logout() to prevent redirect loop
    }

    return Promise.reject(error);
  }
);

export default api;