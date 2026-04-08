// import axios from "axios";

// const instance = axios.create({
//   baseURL: "http://localhost:8080",
// });

// // Attach auth token automatically
// instance.interceptors.request.use(
//   (config) => {
//     const auth = localStorage.getItem("auth"); // ✅ FIXED
//     if (auth) {
//       config.headers.Authorization = `Basic ${auth}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error),
// );

// export default instance;

// import axios from "axios";

// const instance = axios.create({
//   baseURL: "http://localhost:8080",
// });

// instance.interceptors.request.use((config) => {
//   const auth = localStorage.getItem("auth");

//   if (auth) {
//     config.headers.Authorization = `Basic ${auth}`;
//   }

//   return config;
// });

// export default instance;

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
});

// ✅ ADD THIS INTERCEPTOR (VERY IMPORTANT)
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("auth");

  if (token) {
    config.headers.Authorization = `Basic ${token}`;
  }

  return config;
});

export default api;