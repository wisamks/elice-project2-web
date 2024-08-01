import axios from "axios";
import { baseURI } from "../controllers/baseURI";

const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
};

const apiInterceptors = axios.create({
    baseURL: baseURI,
    headers:{
        'Content-Type' : 'application/json',
    },
    withCredentials: true,
});

apiInterceptors.interceptors.request.use(
    (config) => {
        const accessToken = getCookie('accessToken');
        const refreshToken = getCookie('refreshToken');

        if(accessToken && refreshToken){
            config.headers.common['Authorization'] = `${accessToken}`;
            config.headers.common['Refresh-Token'] = `${refreshToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiInterceptors.interceptors.response.use(
    (response) => {
        return response;
    }, (error) => {
        return Promise.reject(error);
    }
);

export default apiInterceptors;