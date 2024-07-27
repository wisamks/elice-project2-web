const NaverLogin = () => {
    const REST_API_KEY = '' // 백엔드에서 받기
    const REDIRECT_URI = '' // 백엔드에서 받기
    const link = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&state=STATE`;

    const loginHandler = () => {
        window.location.href = link;
    };

    return (
        <p className="signin-btn-naver" onClick={loginHandler}>
            <img src='/images/ico-symbol-naver-wh.png' />
            네이버 로그인/회원가입
        </p>
    );
};

export default NaverLogin;