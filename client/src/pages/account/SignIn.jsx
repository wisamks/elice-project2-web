import { useLocation } from 'react-router-dom';
import NaverLogin from '../../components/account/authBtns/NaverLogin';
import GoogleLogin from '../../components/account/authBtns/GoogleLogin';

import './account-common.css';
import './SignIn.css';

const SignIn = () => {
    const location = useLocation();
    const redirect = location.search.split('redirect=')[1] ? decodeURIComponent(location.search.split('redirect=')[1]) : '/';

    return(
        <div className="SignIn account-wrap">
            <h1>로그인/회원가입</h1>
            <div className='signin-btns'>
                <NaverLogin redirect={redirect} />
                <GoogleLogin redirect={redirect} />
            </div>
        </div>
    )
}

export default SignIn;