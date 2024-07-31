import jwt from 'jsonwebtoken';
import {Response} from 'express';

import { getProfileGoogle, getProfileNaver, setToken } from '@_utils';
import UserModel from '@_models/userModel';
import { ForbiddenError, InternalServerError } from '@_/utils/customError';
import { SnsCode } from '@_/customTypes/userType';
import { jwtRefreshTokenSecret } from '@_config';
import TokenModel from '@_models/tokenModel';

// authService를 모아두는 클래스
class authService {
    // sns에서 유저 정보 불러오기
    static async getUserFromSns (code: string, sns_code: string) {
        try {
            let user: any;
            if (sns_code === 'google') {
                user = getProfileGoogle(code);
            } else if (sns_code === 'naver') {
                user = getProfileNaver(code);
            }
            return user;
        } catch (err) {
            if (err instanceof Error) {
                const message = err.message;
                throw new Error(message);
            }
        }
    }
    // 유저 생성
    static async createUser (nickname: string, name: string, email: string, snsCode: SnsCode, image?: string) {
        const createdUser = await UserModel.initiateUserFromOauth({nickname, name, email, image, snsCode});
        if (!createdUser) {
            throw new InternalServerError('유저를 생성하는 데 실패했습니다.');
        }
        const accessToken = setToken(createdUser.id);
        const refreshToken = setToken(createdUser.id, true);
        return {userId: createdUser.id, accessToken, refreshToken};
    }
    // 토큰들 삭제
    static async deleteTokens (res: Response) {
        // accessToken 삭제
        res.clearCookie('accessToken');
        // refreshToken 구현 시 추가
        res.clearCookie('refreshToken');

        return;
    }
    // 회원 삭제
    static async deleteUser (userId: number) {
        await UserModel.softDelete(userId);
        return;
    }
    // refresh 유효성 검증
    static async validateRefresh (refreshToken: string) {
        const foundToken = await TokenModel.findOne(refreshToken);
        if (!foundToken) {
            throw new ForbiddenError('잘못된 접근입니다.');
        }
        return jwt.verify(refreshToken, jwtRefreshTokenSecret);
    }
    // refresh db 생성
    static async createRefresh (userId: number, refreshToken: string) {
        // 검색 유저 아이디로 토큰
        const foundToken = await TokenModel.findByUserId(userId);
        if (foundToken) {
            const updatedToken = await TokenModel.updateOne(userId, refreshToken);
            return updatedToken;
        }
        const createdToken = await TokenModel.create(userId, refreshToken);
        return createdToken;
    }
    // refresh db 삭제
    static async deleteRefresh (refreshToken: string) {
        const deleted = await TokenModel.delete(refreshToken);
        return;
    }
}

export default authService;