import { useNavigate, useLocation } from "react-router-dom";

const LoginButton = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogin = () => {
        const currentPath = location.pathname + location.search;
        navigate(`/sign-in?redirect=${encodeURIComponent(currentPath)}`);
    };

    return(
        <div className="" onClick={handleLogin}>로그인/회원가입</div>
    );
};