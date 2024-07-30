import NaverLogin from '../../components/account/authBtns/NaverLogin';
import GoogleLogin from '../../components/account/authBtns/GoogleLogin';

import '../../styles/account-common.css';
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