import Cookies from "js-cookie";

export const signInModel = (res) => {
    const accessToken = res.accessToken;
    Cookies.set('access_token', accessToken, { expires: 1});
};