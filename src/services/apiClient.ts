import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add Basic Auth header to every request
apiClient.interceptors.request.use((config) => {
  const auth = localStorage.getItem('hrms_auth');
  if (auth) {
    config.headers.Authorization = `Basic ${auth}`;
  }
  return config;
});

// Handle 401/403 responses
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('hrms_auth');
      localStorage.removeItem('hrms_user');
      window.location.href = '/login';
    } else if (error.response?.status === 403) {
      console.error('Access denied');
    }
    return Promise.reject(error);
  }
);

export default apiClient;
