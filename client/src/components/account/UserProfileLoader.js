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
                    userId: data.userId || '',
                    nickname: data.nickname || '',
                    profileImage: data.profileImage || '',
                });
                console.log(data);

            } catch (error) {
                setUserState({
                    name: '',
                    userId: '',
                    nickname: '',
                    profileImage: '',
                });
            }
        };

        loadUserProfile();
    }, [setUserState]);
    
    return null;
};

export default UserProfileLoader;