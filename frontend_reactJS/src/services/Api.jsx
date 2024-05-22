import axios from 'axios';

const Api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true
});

// console.log('Base URL:', import.meta.env.VITE_API_BASE_URL);

// Function to get token from sessionStorage
export const getTokenFromSessionStorage = () => {
  return sessionStorage.getItem('DTRMS_BY_M4RKBELLO');
};

// Function to set the bearer token in the request headers
const setAuthorizationToken = (config) => {
  const token = getTokenFromSessionStorage();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

// Intercept all requests and attach the bearer token
Api.interceptors.request.use(
  setAuthorizationToken,
  (error) => {
    return Promise.reject(error);
  }
);

export default Api;
