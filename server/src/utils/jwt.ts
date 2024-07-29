import jwt from 'jsonwebtoken';
import {Response} from 'express';
import { jwtAccessTokenSecret } from '@_config/index';
import { User } from '@_customTypes/express';

const setAccessToken = (res: Response, user: User) => {
    const jwtToken = jwt.sign(user, jwtAccessTokenSecret, { expiresIn: '1h' });
    res.cookie('jwt', jwtToken, { httpOnly: true, secure: true, maxAge: 3600000 }); // 1시간
    return;
}

export default setAccessToken;