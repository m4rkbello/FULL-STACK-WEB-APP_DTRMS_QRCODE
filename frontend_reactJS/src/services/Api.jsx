/* eslint-disable react-refresh/only-export-components */
import axios from 'axios';


const Api = axios.create({
  baseURL: "http://127.0.0.1:8000/",
  withCredentials: true
});


export const getTokenFromLocalStorage = () => {
  return localStorage.getItem('DTRMS_BY_M4RKBELLO');
};

export const getTokenFromSessionStorage = () => {
  return sessionStorage.getItem('DTRMS_BY_M4RKBELLO');
};


console.log("STORE TOKEN", getTokenFromLocalStorage());

console.log("STORE TOKEN", getTokenFromSessionStorage());

Api.interceptors.request.use(
  (config) => {
    // Get the token from localStorage
    const token = getTokenFromSessionStorage();
    const token2 = getTokenFromSessionStorage();

    //labayan niyang bearer token
    if (token && token2) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


export default Api;