// 설정
import pool from './db';
import dotenv from 'dotenv';
dotenv.config();

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientPw = process.env.GOOGLE_CLIENT_PW;
const serverPort = process.env.SERVER_PORT;

export {
    pool,
    googleClientId,
    googleClientPw,
    serverPort,
};