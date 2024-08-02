import { baseURI } from './baseURI';

export const signOutController = async (apiClient) => {
    const fetchURI = `${baseURI}/api/auth/logout`;

    const response = await apiClient.post(fetchURI, {}, {
        withCredentials: true,
    });

    return response;
}