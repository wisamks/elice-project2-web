import jwt from 'jsonwebtoken';
import { jwtAccessTokenSecret } from '@_config/index';

const setToken = (userId: number, isRefresh = false) => {
    const time = isRefresh ? '1d' : '1h';
    const jwtToken = jwt.sign({userId}, jwtAccessTokenSecret, { expiresIn: time })
    return jwtToken;
}

export {
    setToken,
};