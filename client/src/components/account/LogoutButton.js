import React from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../../services/apiService';
import { signOutController } from '../../controllers/signOutController';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout =  async() => {
    try {
      const response =  await apiService(signOutController);

      if (response) {
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