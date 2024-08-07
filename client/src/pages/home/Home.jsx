import BarChart from '../../components/chart/BarChart';

import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { signOutController } from '../../controllers/signOutController'; 
import { apiService } from '../../services/apiService';
import LogoutButton from '../../components/account/LogoutButton';

import './Home.css';

const Home = () => {

  return (
    <div className="Home">      
      <LogoutButton />
      <div className='Home-main01'>
        <div className='image'><p><img src='images/home-img01.jpg' alt='' /></p></div>
        <div className='text'>
          <p className='txt1'>EarthCloset</p>
          <p className='txt2'>옷의 <strong>순환</strong>이 곧 지구의 <strong>기쁨</strong>입니다</p>
        </div>
      </div>
      <BarChart />
    </div>
  );
};

export default Home;