import jwt from 'jsonwebtoken';
import {Response} from 'express';
import { jwtAccessTokenSecret } from '@_config/index';
import { User } from '@_customTypes/express';

const setAccessToken = (res: Response, user: User) => {
    const jwtToken = jwt.sign(user, jwtAccessTokenSecret, { expiresIn: '1h' });
    // res.cookie('jwt', jwtToken, { httpOnly: true, maxAge: 3600000 }); 
    // secure: true, https로 바꾸면 추가
    // 쿠키는 refresh때 활용
    return jwtToken;
}

export {
    setAccessToken,
};