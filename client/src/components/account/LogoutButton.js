import React from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../../services/apiService';
import { signOutController } from '../../controllers/signOutController';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const isLoggedOut = await apiService(signOutController);
      console.log('리스폰스 in LogoutButton', isLoggedOut);

      if (isLoggedOut) {
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
