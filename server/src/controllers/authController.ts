import { Request, Response, NextFunction } from 'express';
import { setToken } from '@_utils';
import AuthService from '@_services/authService';
import UserModel from '@_models/userModel';
import { BadRequestError, ConflictError, InternalServerError, UnauthorizedError } from '@_/utils/customError';
import { clientDomain, jwtAccessTokenSecret } from '@_/config';
import { SnsCode } from '@_/customTypes/userType';
import { User } from '@_customTypes/express';

class AuthController {
    // oauth 로그인, 유저가 없다면 회원가입하게 만들기
    static async login (req: Request, res: Response, next: NextFunction) {
        try {
            const { code, sns_code } = req.body;
            const user: any = await AuthService.getUserFromSns(code, sns_code);
            // user 정보를 활용해서 db에서 유저를 찾기. 아마도 sns_code와 email 조합이 가능할 듯.
            const foundUser = await UserModel.findByOauth(user.email, sns_code);
            // 유저를 못 찾았다면 회원가입 시키기
            if (!foundUser) {
                res.cookie('name', user.name, {maxAge: 3600000, httpOnly: true});
                res.cookie('email', user.email, {maxAge: 3600000, httpOnly: true});
                res.cookie('image', user.image, {maxAge: 3600000, httpOnly: true});
                res.cookie('snsCode', user.snsCode, {maxAge: 3600000, httpOnly: true});
                return res.status(200).json({ hasUser: false });
            }
    
            // 유저 id를 가져와서 토큰을 만들 때 집어 넣기
            // 이후 패스포트에서 뜯어서 id를 req.user에 넣게 만들고 그 때부터 로그인한 유저는 해당 아이디로 조회하여 확인
            const accessToken = setToken(foundUser.id);
            const refreshToken = setToken(foundUser.id);
            await AuthService.createRefresh(foundUser.id, refreshToken);

            res.cookie('accessToken', accessToken, {maxAge: 3600000, httpOnly: true}) // domain: 'localhost', 잘 안 되면 옵션으로 추가해보기
            res.cookie('refreshToken', refreshToken, {maxAge: 86400000, httpOnly: true});
            return res.status(200).json({ hasUser: true });
        } catch (err) {
            return next(err);
        }
    }
    // 닉네임 중복 검사
    static async checkNickname (req: Request, res: Response, next: NextFunction) {
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
    static async join (req: Request, res: Response, next: NextFunction) {
        const { nickname } = req.body;
        const name = req.cookies.name;
        const email = req.cookies.email;
        const image = req.cookies.image;
        const snsCode: SnsCode = req.cookies.snsCode;
        res.clearCookie('name');
        res.clearCookie('email');
        res.clearCookie('image');
        res.clearCookie('snsCode');
        try {
            if (!name || !email || !snsCode || !nickname ) {
                throw new BadRequestError('입력값이 올바르지 않습니다.');
            }
            const checked = await UserModel.findExistNickname(nickname);
            if (checked) {
                throw new ConflictError('이미 사용 중인 닉네임입니다.');
            }
            const {userId, accessToken, refreshToken} = await AuthService.createUser(nickname, name, email, snsCode, image);
            res.cookie('accessToken', accessToken, {maxAge: 3600000, httpOnly: true}); // 1시간 https만 쓰면 secure
            res.cookie('refreshToken', refreshToken, {maxAge: 86400000, httpOnly: true}); // 24시간
            await AuthService.createRefresh(userId, refreshToken);
            return res.status(204).end();
        } catch(err) {
            return next(err);
        }
    }
    // 로그아웃
    static async logout (req: Request, res: Response, next: NextFunction) {
        try {
            AuthService.deleteRefresh(req.cookies.refreshToken);
            AuthService.deleteTokens(res);
            if (req.cookies.accessToken || req.cookies.refreshToken) {
                throw new InternalServerError('로그아웃 중 문제가 발생하였습니다.');
            }
            return res.status(204).end();
        } catch(err) {
            return next(err);
        }
    }
    // 회원 탈퇴
    static async delete (req: Request, res: Response, next: NextFunction) {
        try {
            if (typeof(req.user) === 'undefined') {
                throw new UnauthorizedError('로그인이 필요합니다.');
            }
            const user = req.user as User;
            const userId = user.userId;
            AuthService.deleteRefresh(req.cookies.refreshToken);
            AuthService.deleteUser(userId);
            AuthService.deleteTokens(res);
            if (req.cookies.accessToken || req.cookies.refreshToken) {
                throw new InternalServerError('회원탈퇴 중 문제가 발생하였습니다.');
            }
            return res.status(204).end();
        } catch(err) {
            return next(err);
        }
    }
    static async getTokenFromRefresh (req: Request, res: Response, next: NextFunction) {
        const { refreshToken } = req.cookies.refreshToken;
        try {
            if (!refreshToken) {
                throw new UnauthorizedError('로그인이 필요합니다.');
            }
            const payload: any = AuthService.validateRefresh(refreshToken);
            const accessToken = setToken(payload.userId);
            res.cookie('accessToken', accessToken, {maxAge: 3600000, httpOnly: true});
            return res.status(204).end();
        } catch(err) {
            return next(err);
        }
    }
}

export default AuthController;