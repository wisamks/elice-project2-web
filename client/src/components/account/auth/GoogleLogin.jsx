const GoogleLogin = () => {
    const REST_API_KEY = '' // 백엔드에서 받기
    const REDIRECT_URI = '' // 백엔드에서 받기
    const link = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&scope=profile email`;

    const loginHandler = () => {
        window.location.href = link;
    };

    return (
        <p className="signin-btn-google">
            <img src='/images/ico-symbol-google.png' />
            구글 로그인/회원가입
        </p>
    );
};

export default GoogleLogin;