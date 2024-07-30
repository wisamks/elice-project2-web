import jwt from 'jsonwebtoken';
import { jwtAccessTokenSecret } from '@_config/index';

const setAccessToken = (userId: number) => {
    const jwtToken = jwt.sign({userId}, jwtAccessTokenSecret, { expiresIn: '1h' });
    // res.cookie('jwt', jwtToken, { httpOnly: true, maxAge: 3600000 }); 
    // secure: true, https로 바꾸면 추가
    // 쿠키는 refresh때 활용
    return jwtToken;
}

export {
    setAccessToken,
};