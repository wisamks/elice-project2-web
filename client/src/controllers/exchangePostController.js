import { baseURI } from "./baseURI";

export const getExchangePost = async (apiClient, postId) => {
    const fetchURI = baseURI + `/api/exchange-posts/${postId}`;
    const response = await apiClient.get(fetchURI, {
        withCredentials: true,
    });
    return response;
};

export const postExchangePost = async (apiClient, data) => {
    const fetchURI = baseURI + '/api/exchange-posts/'
    const response = await apiClient.post(fetchURI, data, {
        withCredentials: true,
    });

    return response;
};

export const updateExchangePost = async (apiClient, postId, data) => {
    const fetchURI = baseURI + `/api/exchange-posts/${postId}`;
    const response = await apiClient.put(fetchURI, data, {
        withCredentials: true,
    });
    return response;
};

export const deleteExchangePost = async (apiClient, postId) => {
    const fetchURI = baseURI + `/api/exchange-posts/${postId}`;
    const response = await apiClient.delete(fetchURI, {
        withCredentials: true,
    });
    return response;
};

export const getExchangeList = async (apiClient, page, perPage) => {
    const fetchURI = baseURI + `/api/exchange-posts?categoryId=1&page=${page}&perPage=${perPage}`;
    const response = await apiClient.get(fetchURI, {
        // params,
        withCredentials: true,
    });
    return response;
};