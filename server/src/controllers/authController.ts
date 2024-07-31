import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { setAccessToken } from '@_utils';
import authService from '@_services/authService';
import UserModel from '@_models/userModel';
import { ConflictError, InternalServerError, UnauthorizedError } from '@_/utils/customError';
import { clientDomain, jwtAccessTokenSecret } from '@_/config';
import { SnsCode } from '@_/customTypes/userType';
import { User } from '@_customTypes/express';

class authController {
    // oauth 로그인, 유저가 없다면 회원가입하게 만들기
    static async loginController (req: Request, res: Response, next: NextFunction) {
        try {
            const { code, sns_code } = req.body;
            const user: any = await authService.loginService(code, sns_code);
            
            // user 정보를 활용해서 db에서 유저를 찾기. 아마도 sns_code와 email 조합이 가능할 듯.
            const foundUser = await UserModel.findByOauth(user.email, sns_code);
            // 유저를 못 찾았다면 회원가입 시키기
            if (!foundUser) {
                res.cookie('profile', user, {maxAge: 3600000, httpOnly: true});
                return res.status(200).json({ hasUser: false });
            }
    
            // 유저 id를 가져와서 토큰을 만들 때 집어 넣기
            // 이후 패스포트에서 뜯어서 id를 req.user에 넣게 만들고 그 때부터 로그인한 유저는 해당 아이디로 조회하여 확인
            const accessToken = setAccessToken(foundUser.id);
            res.cookie('accessToken', accessToken, {domain: 'localhost', maxAge: 3600000, httpOnly: true})
            return res.status(200).json({ hasUser: true });
        } catch (err) {
            return next(err);
        }
    }
    // 닉네임 중복 검사
    static async nicknameController (req: Request, res: Response, next: NextFunction) {
        const { nickname } = req.body;
        try {
            const checked = await UserModel.findExistNickname(nickname);
            if (checked) {
                throw new ConflictError('이미 사용 중인 닉네임입니다.');
            }
            return res.status(204).end();
        } catch(err) {
            return next(err);
        }
    }
    // 회원가입
    static async joinController (req: Request, res: Response, next: NextFunction) {
        const { nickname } = req.body;
        const { name, email, image, snsCode } = req.cookies.profile;
        try {
            const checked = await UserModel.findExistNickname(nickname);
            if (checked) {
                throw new ConflictError('이미 사용 중인 닉네임입니다.');
            }
            const accessToken = await authService.joinService(nickname, name, email, image, snsCode as SnsCode);
            res.cookie('accessToken', accessToken, {maxAge: 3600000, httpOnly: true});
            return res.status(204).end();
        } catch(err) {
            return next(err);
        }
    }
    // 로그아웃
    static async logoutController (req: Request, res: Response, next: NextFunction) {
        try {
            authService.logoutService(res);
            if (req.cookies.accessToken || req.cookies.refreshToken) {
                throw new InternalServerError('로그아웃 중 문제가 발생하였습니다.');
            }
            return res.status(204).end();
        } catch(err) {
            return next(err);
        }
    }
    // 회원 탈퇴
    static async deleteController (req: Request, res: Response, next: NextFunction) {
        try {
            if (typeof(req.user) === 'undefined') {
                throw new UnauthorizedError('로그인이 필요합니다.');
            }
            const user = req.user as User;
            const userId = user.userId;
            authService.deleteService(userId);
            authService.logoutService(res);
            // if (req.cookies.accessToken || req.cookies.refreshToken) {
            //     throw new InternalServerError('회원탈퇴 중 문제가 발생하였습니다.');
            // }
            return res.status(204).end();
        } catch(err) {
            return next(err);
        }
    }
}

export default authController;