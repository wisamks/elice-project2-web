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

    const handleSignInPost = async (code, redirect) => {
        const data = { 
            code, 
            sns_code: platform
        };

        const res = await apiService((apiClient) => signInController(apiClient, data));
        if (res.hasUser) {
            setIsLoggedIn(true);
            if (redirect) {
                navigate(redirect);
            } else {
                navigate('/');
            }
        } else {
            navigate('/sign-up');
        }
    };

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const code = params.get('code');
        const redirect = params.get('state') ? decodeURIComponent(params.get('state')) : null;
        
        if(code){
            handleSignInPost(code, redirect);
        } else {
            console.log('로그인 재시도');
        }
    }, [location, platform])

    return(
        <div>로딩중...</div>
    );
};

export default SnsCallback;
