import { Request, Response, NextFunction } from 'express';
import passport from 'passport';
// 인증은 하지 않지만 로그인이 됐다면 유저를 알아야 하는 경우 쓰는 미들웨어
const getUserByToken = (req: Request, res: Response, next: NextFunction) => {
    if (!req.cookies.accessToken) {
        return next();
    }
    return passport.authenticate('jwt', { session: false })(req, res, next);
}

export default getUserByToken;