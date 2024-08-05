import { useEffect } from 'react';
import BarChart from '../../components/chart/BarChart';
import { useLocation } from 'react-router-dom';
import { signOutController } from '../../controllers/signOutController';
import { apiService } from '../../services/apiService';

import './Home.css';

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
    <div className='Home'>
      <div className='Home-main01'>
        <div className='image'>
          <p>
            <img src='images/home-img01.jpg' alt='' />
          </p>
        </div>
        <div className='text'>
          <p className='txt1'>EarthCloset</p>
          <p className='txt2'>
            옷의 <strong>순환</strong>이 곧 지구의 <strong>기쁨</strong>입니다
          </p>
        </div>
      </div>
      <BarChart />
      <button onClick={handleLogout}>로그아웃</button>
    </div>
  );
};

export default Home;
