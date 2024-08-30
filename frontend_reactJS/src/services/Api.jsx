/* eslint-disable react-refresh/only-export-components */
import axios from 'axios';

const Api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true
});

const getTokenFromSessionStorage = () => {
  return sessionStorage.getItem('DTRMS_BY_M4RKBELLO');
};

const setAuthorizationToken = (config) => {
  const token = getTokenFromSessionStorage();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
};

Api.interceptors.request.use(
  setAuthorizationToken,
  (error) => {
    return Promise.reject(error);
  }
);


export default Api;



//NEW ADDED
// import axios from 'axios';

// const Api = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL,
//   withCredentials: true,
// });

// const getTokenFromLocalStorage = () => {
//   return localStorage.getItem('DTRMS_BY_M4RKBELLO');
// };

// const getTokenFromSessionStorage = () => {
//   return sessionStorage.getItem('DTRMS_BY_M4RKBELLO');
// };

// const getTokenFromCookies = () => {
//   const cookieString = document.cookie;
//   const cookies = cookieString.split('; ');
//   for (let cookie of cookies) {
//     const [key, value] = cookie.split('=');
//     if (key === 'DTRMS_BY_M4RKBELLO') {
//       return value;
//     }
//   }
//   return null;
// };

// const setAuthorizationToken = (config) => {
//   const token = getTokenFromCookies() || getTokenFromLocalStorage() || getTokenFromSessionStorage(); 
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// };


// Api.interceptors.request.use(
//   setAuthorizationToken,
//   (error) => {
//     return Promise.reject(error);
//   }
// );

// // Fetch all departments
// Api.get('/departments/view/all')
//   .then(response => {
//     console.log('Departments:', response.data);
//   })
//   .catch(error => {
//     console.error('Error fetching departments:', error.response || error.message);
//   });

//   export default Api;

