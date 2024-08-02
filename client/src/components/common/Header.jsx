import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const checkLoginStatus = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/auth/access', {
        method: 'GET',
        credentials: 'include',
      });

      if (response.ok) {
        setIsLoggedIn(true);
      } else if (response.status === 401) {
        setIsLoggedIn(false);
        // console.warn('401 Unauthorized: Access token is invalid or expired. User is not logged in.')
      } else {
        setIsLoggedIn(false);
      }
  
    } catch (error) {
      console.error('Error checking login status:', error);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
    setIsDropdownOpen(false);
  };

  const toggleDropdown = () => {
    setIsSearchOpen(false);
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleClear = () => {
    setSearchTerm("");
  };

  const handleSearchTermChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <header id="header">
      <div className="header-wrap">
        <h1 className="title">
          <Link to="/">EarthCloset</Link>
        </h1>
        
        <nav className="nav">
          <ul className="nav-list">
            <li className="nav-item">
              <Link to="/">중고거래</Link>
            </li>
            <li className="nav-item">
              <Link to="/">의류수거함 위치</Link>
            </li>
            <li className="nav-item">
              <Link to="/">의류수거함 인증</Link>
            </li>
            <li className="nav-item">
              <Link to="/">리폼 정보</Link>
            </li>
          </ul>
        </nav>

        <div className="header-right">
          <div className={`search ${isSearchOpen ? "open" : ""}`}>
            {isSearchOpen && (
              <div className="search">
                <input
                  className="search-input"
                  type="text"
                  placeholder="검색어를 입력하세요."
                  value={searchTerm}
                  onChange={handleSearchTermChange}
                />
                <img
                  className="search-icon-input"
                  src="/images/search-icon.png"
                  alt="search"
                />
                <img
                  className="clear-icon"
                  src="/images/clear-icon.png"
                  alt="취소"
                  onClick={handleClear}
                />
              </div>
            )}
            <img
              className="search-icon"
              src="/images/search-icon.png"
              alt="검색"
              onClick={toggleSearch}
            />
          </div>

          {isLoggedIn ? (
            <>
              <div className="notification">
                <img className="alram-icon" src="/images/alram.png" alt="알림" />
                <span className="notification-count">0</span>
              </div>

              <div className="dropdown">
                <button className="mypage-button" onClick={toggleDropdown}>마이페이지</button>
                {isDropdownOpen && (
                  <ul className="dropdown-menu">
                    <li className="dropdown-item"><Link to="/">프로필</Link></li>
                    <li className="dropdown-item"><Link to="/">나의 등급</Link></li>
                    <li className="dropdown-item"><Link to="/">나의 거래</Link></li>
                    <li className="dropdown-item"><Link to="/">나의 활동</Link></li>
                    <li className="dropdown-item"><Link to="/">로그아웃</Link></li>
                  </ul>
                )}
              </div>
            </>
          ) : (
            <Link to="/sign-in" className="auth-button">로그인/회원가입</Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
