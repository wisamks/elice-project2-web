import { baseURI } from "../controllers/baseURI";

export const fetchUserProfile = async () => {
    try {
        const response = await fetch(`${baseURI}/api/users/profile`, {
            method: 'GET',
            credentials: 'include',
        });

        if (!response.ok) {
            throw new Error('Failed to fetch user profile');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw error;
    } 
}