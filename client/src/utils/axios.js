import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  //baseURL: process.env.VITE_BASE_URL || 'http://localhost:4000', //Lien pour les tests
  withCredentials: true,
});

export default axiosInstance;
