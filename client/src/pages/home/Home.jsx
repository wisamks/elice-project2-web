import Cookies from 'js-cookie';

const handleLogout = async () => {
  try {
    const token = Cookies.get('access_token');

    const res = await fetch('http://localhost:8080/api/auth/logout', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include'
    });

    if (res.ok) {
      Cookies.remove('access_token', { path: '/' });
      Cookies.remove('refresh_token', { path: '/' });

      window.location.href = '/sign-in';
    } else {
      console.error('로그아웃 오류:', res.statusText);
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
