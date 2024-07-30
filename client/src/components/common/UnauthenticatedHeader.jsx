import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import "./Header.css";

const UnauthenticatedHeader = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const clearSearch = () => {
    setSearchTerm("");
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
                      <img className="clear-icon" src="/images/clear-icon.png" alt="clear" onClick={clearSearch}/> 
                    </div>
                )}
                      <img className="search-icon" src="/images/search-icon.png" alt="search" onClick={toggleSearch}/>

              </div>
                <Link to="sign-in" className="auth-button">로그인/회원가입</Link>
            </div>
          </div>
        </header>
    )
}

export default UnauthenticatedHeader;