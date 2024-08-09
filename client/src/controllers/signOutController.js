import { baseURI } from './baseURI';

export const signOutController = async (apiClient) => {
    const fetchURI = `${baseURI}/api/auth/logout`;

    const response = await apiClient.post(fetchURI, {}, {
        withCredentials: true,
    });

    const isLoggedOut = response.status === 204;

    return { data: isLoggedOut};
};