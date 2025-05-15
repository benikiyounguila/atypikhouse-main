// import axios from 'axios';

// const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_BASE_URL,
//   // baseURL: process.env.VITE_BASE_URL || 'http://localhost:4000', //Lien pour les tests
//   withCredentials: true,
// });

// export default axiosInstance;

import axios from 'axios';

const isServer = typeof window === 'undefined';

const axiosInstance = axios.create({
  baseURL: isServer
    ? process.env.VITE_BASE_URL || 'http://localhost:5000/api'
    : import.meta.env.VITE_BASE_URL || '/api',
  withCredentials: true,
});

console.log('[AXIOS] Base URL:', isServer ? process.env.VITE_BASE_URL : import.meta.env.VITE_BASE_URL);

export default axiosInstance;


