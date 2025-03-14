import axios from "axios";
import { baseURI } from "../controllers/baseURI";
import apiClient from "./apiClient";

const apiInterceptors = apiClient;

apiInterceptors.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

apiInterceptors.interceptors.response.use(
    (response) => {
        return response;
    }, async (error) => {
        const requestPath = error.config.url;

        if(error.response){            
            const status = error.response.status;

            if(status === 401){
                if(requestPath.includes('/api/auth/refresh')){
                    console.log('Refresh token is invalid. Redirecting to login...');
                    window.location.href = '/sign-in';
                } else {
                    try{
                        await handleTokenRefresh();
                        return apiInterceptors(error.config);
                    } catch (refreshError) {
                        console.log('Token refresh failed:', refreshError);
                        window.location.href = '/sign-in';
                    }
                }
            } else if (status === 403){
                console.log('Access denied. Please check your permissions.');
            } else {
                console.log(`Error status: ${status}`);
            } 
        } else {
            console.log('Network error or no response from server.');
        }

        return Promise.reject(error);
    }
);

async function handleTokenRefresh() {
    try {
        const path = baseURI + '/api/auth/refresh';
        const response = await apiInterceptors.post(path);
        return response.data.token;
    } catch (error) {
        throw new Error('Failed to refresh token');
    }
}

export default apiInterceptors;