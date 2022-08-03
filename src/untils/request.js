import axios from "axios";
import router from "../router/routers";
const service = axios.create({
    baseURL: process.env.VUE_APP_URL,
    timeout: process.env.VUE_APP_TIMEOUT || 3000,
    headers: {

    }
});
// request interceptor
service.interceptors.request.use(
    (config) => {
        console.log()
        config.headers["Content-Type"] = "application/json";
        if (localStorage.getItem('Token')) {
            config.headers["Authorization"] = "Bearer " + localStorage.getItem('Token');
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);
// response interceptor
service.interceptors.response.use(
    (response) => {
        if (response.status === 401) {
          router.push('/login');
        }
        return response.data;
    },
    (error) => {
        return Promise.reject((error));
    }
);

export default service;