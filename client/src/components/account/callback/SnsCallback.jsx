import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const SnsCallback = ({ platform, apiEndpoint }) => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleHome = () => {
        navigate('/');
        window.location.reload();
    }

    const handleSignUp = () => {
        navigate('/sign-up');
        window.location.reload();
    }

    const handleSignInPost = async (code) => {
        const data = { code };

        try{
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers:{
                    'Content-Type' : 'application/json'
                },
                body: JSON.stringify({ data })
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const res = await response.json();

            const accessToken = res.accessToken;
            Cookies.set('access_token', accessToken, { expires: 1});

            res.isMember ? handleHome() : handleSignUp(); // 백엔드 필드이름 확인
        } catch (error) {
            console.error(`Error exchanging code for tokens with ${platform}:`, error);
        }
    };

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const code = params.get('code');
        console.log(code);

        if(code){
            handleSignInPost(code);
        } else {
            console.log('로그인 재시도');
        }
    }, [location])

    return(
        <div>로딩중...</div>
    );
};

export default SnsCallback;