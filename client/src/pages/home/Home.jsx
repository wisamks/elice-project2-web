import Cookies from 'js-cookie';

const handleLogout = () => {
    Cookies.remove('access_token');
    window.location.href = '/sign-in';
};

const Home = () => {
    return(
        <div>
            인덱스
            <p onClick={handleLogout}>로그아웃</p>
        </div>
    );
};

export default Home;