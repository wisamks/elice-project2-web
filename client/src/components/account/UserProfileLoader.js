import React, { useEffect } from 'react';
import  { useSetRecoilState } from 'recoil';
import { userState } from '../../atom/userState';
import { fetchUserProfile } from '../../services/userService';

const UserProfileLoader = () => {
    const setUserState = useSetRecoilState(userState);

    useEffect(() => {
        const loadUserProfile = async () => {
            try {
                const data = await fetchUserProfile();

                setUserState({
                    name: data.name || '',
                    id: data.id || '',
                    nickname: data.nickname || '',
                    image: data.image || '',
                });
                console.log(data);

            } catch (error) {
                setUserState({
                    name: '',
                    id: '',
                    nickname: '',
                    image: '',
                });
            }
        };

        loadUserProfile();
    }, [setUserState]);
    
    return null;
};

export default UserProfileLoader;