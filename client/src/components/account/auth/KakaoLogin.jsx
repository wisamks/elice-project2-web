const KakaoLogin = () => {
    const REST_API_KEY = '' // 백엔드에서 받기
    const REDIRECT_URI = '' // 백엔드에서 받기
    const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    const loginHandler = () => {
        window.location.href = link;
    };

    return (
        <p className="signin-btn-kakao" onClick={loginHandler}>
            <img src='/images/ico-symbol-kakao.png' />
            카카오 로그인/회원가입
        </p>
    );
};

export default KakaoLogin;