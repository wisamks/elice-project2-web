import SnsCallback from "./SnsCallback";

const NaverCallback = () => {
    return(
        <SnsCallback platform={"naver"} apiEndpoint={"/api/auth/naver"} />
    );
};

export default NaverCallback;