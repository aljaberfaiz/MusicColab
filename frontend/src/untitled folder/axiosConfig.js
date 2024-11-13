import axios from 'axios';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'https://melodic-match.onrender.com', // Use the new backend URL
});

// Add a request interceptor to include the JWT token in requests
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
