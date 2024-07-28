import "./Header.css";
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const AuthenticatedHeader = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleSearch = () => {
    if (isDropdownOpen) {
      setIsDropdownOpen(false);
    }
    setIsSearchOpen(!isSearchOpen);
  };

  const clearSearch = () => {
    setSearchTerm("");
  };

  const toggleDropdown = () => {
    if (isSearchOpen) {
      setIsSearchOpen(false);
    }
    setIsDropdownOpen(!isDropdownOpen);
  };
    return (
        <header id="header">
          <div className="header-wrap">
            <h1 className="title"><Link to="/">EarthCloset</Link></h1>
            <nav className="nav">
                <ul className="nav-list">
                    <li className="nav-item"><Link to="/">중고거래</Link></li>
                    <li className="nav-item"><Link to="/">의류수거함 위치</Link></li>
                    <li className="nav-item"><Link to="/">의류수거함 인증</Link></li>
                    <li className="nav-item"><Link to="/">리폼 정보</Link></li>
                </ul>
            </nav>
            <div className="header-right">
              <div className={`search ${isSearchOpen ? "open" : ""}`}>
                {isSearchOpen && (
                    <div className="search">
                      <input className="search-input" type="text" placeholder="검색어를 입력하세요." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                      <img className="search-icon-input" src="/images/search-icon.png" alt="search" />
                      <img className="clear-icon" src="/images/clear-icon.png" alt="clear" onClick={clearSearch} /> 
                    </div>
                )}
                      <img className="search-icon" src="/images/search-icon.png" alt="search" onClick={toggleSearch}/>

              </div>
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
            </div>
          </div>
        </header>
    )
}

export default AuthenticatedHeader;