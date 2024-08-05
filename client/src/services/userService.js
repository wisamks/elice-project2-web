export const fetchUserProfile = async () => {
    try {
        const response = await fetch('http://localhost:8080/api/users/profile', {
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