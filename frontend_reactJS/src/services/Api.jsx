// import axios from 'axios';

// const Api = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL,
//   withCredentials: true
// });

// const getTokenFromSessionStorage = () => {
//   return sessionStorage.getItem('DTRMS_BY_M4RKBELLO');
// };

// const setAuthorizationToken = (config) => {
//   const token = getTokenFromSessionStorage();
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

// export default Api;


import axios from 'axios';

const Api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json'
  }
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
  (config) => {
    // Ensure Content-Type is set for POST requests
    if (config.method === 'post') {
      config.headers['Content-Type'] = 'application/json';
    }
    return setAuthorizationToken(config);
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default Api;
