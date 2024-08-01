import React from 'react';

const handleLogout = async () => {
  try {
    const res = await fetch('http://localhost:8080/api/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    });

    if (res.ok) {
      window.location.href = '/sign-in';
    }
  } catch (error) {
    console.error('로그아웃 오류:', error);
  }
};

const Home = () => {
  return (
    <div>
      인덱스
      <p onClick={handleLogout}>로그아웃</p>
    </div>
  );
};

export default Home;

