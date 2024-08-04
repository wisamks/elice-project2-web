import jwt from 'jsonwebtoken';
import { jwtAccessTokenSecret, jwtRefreshTokenSecret } from '@_config/index';

const setToken = (userId: number, isRefresh = false) => {
    const time = isRefresh ? '1d' : '1h';
    const secretKey = isRefresh ? jwtRefreshTokenSecret : jwtAccessTokenSecret;
    const jwtToken = jwt.sign({userId}, secretKey, { expiresIn: time, algorithm: 'HS256' })
    return jwtToken;
}

export default setToken;