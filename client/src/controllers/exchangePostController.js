import { baseURI } from "./baseURI";

export const exchangePostController = async (apiClient, data) => {
    const fetchURI = baseURI + '/api/exchange-posts/'

    const response = await apiClient.post(fetchURI, data, {
        withCredentials: true,
    });

    return response;
};