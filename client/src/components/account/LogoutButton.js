import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { loginState } from '../../atom/userState';
import { apiService } from '../../services/apiService';
import { signOutController } from '../../controllers/signOutController';

const LogoutButton = () => {
  const navigate = useNavigate();
  const setIsLoggedIn = useSetRecoilState(loginState);

  const handleLogout = async() => {
    try {
      const isLoggedOut = await apiService(signOutController);

      if (isLoggedOut) {
        setIsLoggedIn(false);
        navigate('/sign-in');
      }
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <button className='logout-button' onClick={handleLogout}>
      로그아웃
    </button>
  );
};

export default LogoutButton;