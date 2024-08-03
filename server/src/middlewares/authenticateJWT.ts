import {Request, Response, NextFunction} from 'express';
import passport from 'passport';
// import jwt from 'jsonwebtoken';

// import { UnauthorizedError, ForbiddenError } from '@_utils/customError';
// import { jwtAccessTokenSecret, jwtRefreshTokenSecret } from '@_config';

const authenticateAccessToken = (req: Request, res: Response, next: NextFunction) => {
    return passport.authenticate('jwt', { session: false })(req, res, next);

    // refresh 토큰 구현 시 쿠키에 담긴 refresh 토큰 꺼내서 새로 발급하는 로직 필요
    // const { accessToken, refreshToken } = req.cookies;
    // try {
    //     if (!accessToken) {
    //         throw new UnauthorizedError('로그인이 필요합니다.');
    //     }
    //     jwt.verify(req.cookies.accessToken, jwtAccessTokenSecret, async (err:any, user: any) => {
    //         if (err) {
    //             if (err.name === 'TokenExpiredError') {
    //                 if (!req.cookies.refreshToken) {
    //                     throw new UnauthorizedError('로그인이 필요합니다.');
    //                 }
    //                 // db에서 유저 검증
    //                 const check = await findRefreshToken(req.cookies.refreshToken);
    //                 if (!check) {
    //                     throw new ForbiddenError('잘못된 접근입니다.');
    //                 }
    //             }
    //         }
    //     })
    //     return passport.authenticate('jwt', { session: false })(req, res, next);
    // } catch (err) {
    //     return next(err);
    // }
}

export default authenticateAccessToken;