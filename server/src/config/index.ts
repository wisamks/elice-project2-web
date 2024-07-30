// 설정
import pool from '@_config/db';
import dotenv from 'dotenv';
dotenv.config();

const clientDomain = process.env.LOCAL_CLIENT_DOMAIN as string;

const googleClientId = process.env.REACT_APP_GOOGLE_CLIENT_ID as string;
const googleClientPw = process.env.REACT_APP_GOOGLE_CLIENT_SECRET as string;
const googleRedirectUri = process.env.REACT_APP_GOOGLE_REDIRECT_URI as string;

const naverClientId = process.env.REACT_APP_NAVER_CLIENT_ID as string;
const naverClientPw = process.env.REACT_APP_NAVER_CLIENT_SECRET as string;
const naverRedirectUri = process.env.REACT_APP__NAVER_REDIRECT_URI as string;

const serverPort = process.env.SERVER_PORT as string;
const jwtAccessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET as string;
const jwtRefreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET as string;

export {
    clientDomain,

    pool,
    googleClientId,
    googleClientPw,
    googleRedirectUri,

    naverClientId,
    naverClientPw,
    naverRedirectUri,

    serverPort,
    jwtAccessTokenSecret,
    jwtRefreshTokenSecret,
};