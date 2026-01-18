import axios, { AxiosError, type AxiosInstance } from "axios";

const apiClient : AxiosInstance= axios.create({
    baseURL: import.meta.env.VITE_API_URL,
      timeout: 10000,
});

export const apiClientRest : AxiosInstance= axios.create({
    baseURL: "/api",
      timeout: 10000,
});


apiClientRest.interceptors.request.use(config=>{
    // const token = localStorage.getItem("token");
    const jwt = sessionStorage.getItem("jwt");
    if(jwt){
        config.headers.Authorization = `Bearer ${jwt}`;
    }
    return config;
})

apiClient.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);


export default apiClient;
