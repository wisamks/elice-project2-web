// 설정
import pool from '@_config/db';
import dotenv from 'dotenv';
dotenv.config();

const googleClientId = process.env.GOOGLE_CLIENT_ID as string;
const googleClientPw = process.env.GOOGLE_CLIENT_PW as string;
const serverPort = process.env.SERVER_PORT as string;
const jwtAccessTokenSecret = process.env.JWT_ACCESS_TOKEN_SECRET as string;
const jwtRefreshTokenSecret = process.env.JWT_REFRESH_TOKEN_SECRET as string;

export {
    pool,
    googleClientId,
    googleClientPw,
    serverPort,
    jwtAccessTokenSecret,
    jwtRefreshTokenSecret,
};