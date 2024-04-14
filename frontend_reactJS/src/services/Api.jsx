/* eslint-disable react-refresh/only-export-components */
import axios from 'axios';


const Api = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  withCredentials: true
});


export const getTokenFromLocalStorage = () => {
  return localStorage.getItem('DTRMS_BY_M4RKBELLO');
};

console.log("STORE TOKEN", getTokenFromLocalStorage());

Api.interceptors.request.use(
  (config) => {
    // Get the token from localStorage
    const token = getTokenFromLocalStorage();

    // Include the token in the request headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);




export default Api;