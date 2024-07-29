import SnsCallback from "./SnsCallback";

const GoogleCallback = () => {
    return(
        <SnsCallback platform={"google"} apiEndpoint={"/api/auth/google"} />
    );
};

export default GoogleCallback;