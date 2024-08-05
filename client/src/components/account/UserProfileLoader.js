import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { userState, loginState } from '../../atom/userState';
import { apiService, fetchUserProfile } from '../../services';
import { authTokenValidController } from '../../controllers/authController';

const UserProfileLoader = ({ children }) => {
  const setUserState = useSetRecoilState(userState);
  const setIsLoggedIn = useSetRecoilState(loginState);

  const location = useLocation();

  useEffect(() => {
    //       null/undefined
    // object undefined boolean
    console.log('state!!!', location.state);
    if (location.state?.refresh) {
      setIsLoggedIn(true);
    }
  }, [location]);

  useEffect(() => {
    if (location.state?.refresh) {
      apiService(authTokenValidController)
        .then(() => {
          console.log('유저는 유효한 토큰을 갖고 있다.');

          // loadUserProfile().then(() => {});
        })
        .catch(() => {
          console.log('유저는 오류!!');
        });
    }
  }, [location]);

  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const data = await fetchUserProfile();

        setUserState({
          name: data.name || '',
          id: data.id || '',
          nickname: data.nickname || '',
          profileImage: data.profileImage || '',
        });
        console.log(data);
      } catch (error) {
        setUserState({
          name: '',
          id: '',
          nickname: '',
          profileImage: '',
        });
      }
    };

    loadUserProfile();
  }, [setUserState]);

  return children;
};

export default UserProfileLoader;
