import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { jwtAccessTokenSecret } from '@_config';
// 인증은 하지 않지만 로그인이 됐다면 유저를 알아야 하는 경우 쓰는 미들웨어
const getUserByToken = (req: Request, res: Response, next: NextFunction) => {
    if (!req.cookies.accessToken) {
        return next();
    }
    try {
        const user = jwt.verify(req.cookies.accessToken, jwtAccessTokenSecret, { algorithms: ['HS256'] });
        req.user = user;
        return next();
    } catch(err) {
        return next();
    }
}

export default getUserByToken;