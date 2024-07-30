import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import { apiService } from "../../../services/apiService";
import { signInController } from "../../../controllers/signInController";
import { signInModel } from "../../../models/signInModel";

const SnsCallback = ({ platform }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const redirectHome = () => {
        navigate('/');
        window.location.reload();
    }

    const redirectSignUp = () => {
        navigate('/sign-up');
        window.location.reload();
    }

    const handleSignInPost = async (code) => {
        const data = { code };
        data.sns_code = platform;
        const res = await apiService(() => signInController(data), signInModel);
        res.accessToken ? redirectHome() : redirectSignUp();
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
