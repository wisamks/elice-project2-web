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

export const getExchangeList = async (apiClient, page, perPage, filters) => {
    const params = new URLSearchParams({
        page,
        perPage,
        categoryId: 1,
    });

    Object.keys(filters).forEach(key => {
        if(filters[key] && filters[key] !== '전체'){
            params.append(key, filters[key]);
        }
    });

    const fetchURI = baseURI + `/api/exchange-posts?${params.toString()}`;
    const response = await apiClient.get(fetchURI, {
        withCredentials: true,
    });
    return response;
};

export const updatePostStatus = async (apiClient, postId, status) =>{
    const fetchURI = baseURI + '/api/exchange-posts/status';
    const response = await apiClient.put(fetchURI, {
        postId,
        status,        
    }, {
        withCredentials: true,
    });
    return response.config.data;
};