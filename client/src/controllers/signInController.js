import { baseURI } from "./baseURI";

export const signInController = async (apiClient, data) => {
    const fetchURI = baseURI + '/api/auth/login'

    const response = await apiClient.post(fetchURI, data, {
        withCredentials: true,
    });

    return response;
};