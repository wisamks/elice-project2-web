import NaverLogin from '../../components/account/auth/NaverLogin';
import GoogleLogin from '../../components/account/auth/GoogleLogin';

import '../../styles/account-commen.css';
import './SignIn.css';

const SignIn = () => {
    return(
        <div className="SignIn account-wrap">
            <h1>로그인/회원가입</h1>
            <div className='signin-btns'>
                <NaverLogin />
                <GoogleLogin />
            </div>
        </div>
    )
}

export default SignIn;