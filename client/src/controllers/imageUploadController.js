import { baseURI } from "./baseURI";

export const imageUploadController = async (apiClient, formData) => {
    const fetchURI = baseURI + '/api/images/upload';

    const response = await apiClient.post(fetchURI, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
        withCredentials: true,
    });

    return response;
};