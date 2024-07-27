import '../../styles/account-commen.css';
import './SignIn.css';

const SignIn = () => {
    return(
        <div className="SignIn account-wrap">
            <h1>로그인/회원가입</h1>
            <div className='signin-btns'>
                <p className="signin-btn-naver">
                    <img src='/images/ico-symbol-naver-wh.png' />
                    네이버 로그인/회원가입
                </p>
                <p className="signin-btn-kakao">
                    <img src='/images/ico-symbol-kakao.png' />
                    카카오 로그인/회원가입
                </p>
                <p className="signin-btn-google">
                    <img src='/images/ico-symbol-google.png' />
                    구글 로그인/회원가입
                </p>
            </div>
        </div>
    )
}

export default SignIn;