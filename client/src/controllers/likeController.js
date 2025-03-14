import { baseURI } from "./baseURI";

export const likeController = async (apiClient, postId) => {
    const fetchURI = baseURI + '/api/favorite';

    const response = await apiClient.post(fetchURI, { postId: postId }, {
        withCredentials: true,
    });
    return response;
};
