import React from 'react';
import { signOutController } from '../../controllers/signOutController'; 
import { apiService } from '../../services/apiService';

const Home = () => {
  const handleLogout = async () => {
    try {
      const response = await apiService(signOutController);

      if (response) {
        window.location.href = '/sign-in';
      }
    } catch (error) {
      console.error('로그아웃 오류:', error);
    }
  };

  return (
    <div>
      인덱스
      <button onClick={handleLogout}>로그아웃</button>
    </div>
  );
};

export default Home;