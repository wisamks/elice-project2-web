import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { loginState } from "../../../atom/userState";

import { apiService } from "../../../services/apiService";
import { signInController } from "../../../controllers/signInController";

const SnsCallback = ({ platform }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const setIsLoggedIn = useSetRecoilState(loginState);

    const redirectHome = () => {
        navigate('/');
    }

    const redirectSignUp = () => {
        navigate('/sign-up');
    }

    const handleSignInPost = async (code) => {
        const data = { 
            code, 
            sns_code: platform
        };

        const res = await apiService((apiClient) => signInController(apiClient, data));
        if (res.hasUser) {
            setIsLoggedIn(true);
            redirectHome();
        } else {
            redirectSignUp();
        }
    };

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const code = params.get('code');
        
        if(code){
            handleSignInPost(code);
        } else {
            console.log('로그인 재시도');
        }
    }, [location, platform])

    return(
        <div>로딩중...</div>
    );
};

export default SnsCallback;
