import { Link } from 'react-router-dom';
import LoginButton from '../account/LoginButton';
import LogoutButton from '../account/LogoutButton';
import { useRecoilValue } from 'recoil';
import { loginState } from '../../atom/userState';

import './Header.css';

const Header = () => {
  const isLoggedIn = useRecoilValue(loginState);

  return (
    <header id="header">
      <div className="header-wrap">
        <h1 className="title">
          <Link to="/">EarthCloset</Link>
        </h1>

        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/board">중고거래</Link>
            </li>
            <li className="nav-item">
              <Link to="/map">의류수거함 위치</Link>
            </li>
            <li className="nav-item">
              <Link to="/certification">의류수거함 인증</Link>
            </li>
          </ul>
        </nav>

        <div className="header-right">
          {isLoggedIn ? (
            <LogoutButton />
          ) : (
            <LoginButton />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
