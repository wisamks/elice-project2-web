import { useLocation } from 'react-router-dom';

const GoogleLogin = () => {
    const REST_API_KEY = process.env.REACT_APP_GOOGLE_CLIENT_ID;
    const REDIRECT_URI = process.env.REACT_APP_GOOGLE_REDIRECT_URI;

    const location = useLocation();
    const currentPath = location.pathname + location.search;

    const encodedScope = encodeURIComponent('https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile');

    const link = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&scope=${encodedScope}&state=${encodeURIComponent(currentPath)}`;


    return (
        <p>
            <a href={link} className="signin-btn-google">
                <span className='ico'><img src='/images/ico-symbol-google.png' alt='구글' /></span>
                구글 로그인/회원가입
            </a>
        </p>
    );
};

export default GoogleLogin;