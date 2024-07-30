import {Request, Response, NextFunction} from 'express';
import passport from 'passport';

const authenticateAccessToken = (req: Request, res: Response, next: NextFunction) => {
    // refresh 토큰 구현 시 쿠키에 담긴 refresh 토큰 꺼내서 새로 발급하는 로직 필요
    return passport.authenticate('jwt', { session: false })(req, res, next);
}

export default authenticateAccessToken;