import { useLocation } from 'react-router-dom'; 

const NaverLogin = () => {
    const REST_API_KEY = process.env.REACT_APP_NAVER_CLIENT_ID;
    const REDIRECT_URI = process.env.REACT_APP__NAVER_REDIRECT_URI;

    const location = useLocation();
    const currentPath = location.pathname + location.search;

    const link = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&state=${encodeURIComponent(currentPath)}`;

    return (
        <p>
            <a href={link} className="signin-btn-naver">
                <span className='ico'><img src='/images/ico-symbol-naver-wh.png' alt='네이버' /></span>
                네이버 로그인/회원가입
            </a>
        </p>
    );
};

export default NaverLogin;