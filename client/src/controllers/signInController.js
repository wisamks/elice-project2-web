import { baseURI } from "./baseURI";

export const signInController = async (data) => {
    const fetchURI = baseURI + '/api/auth/login'

    const response = await fetch(fetchURI, {
        method: 'POST',
        headers:{
            'Content-Type' : 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(data)
    });

    return response;
};