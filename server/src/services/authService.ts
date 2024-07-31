import { getProfileGoogle, getProfileNaver } from '@_utils';
import UserModel from '@_models/userModel';
import { InternalServerError } from '@_/utils/customError';
import { setAccessToken } from '@_utils';
import { SnsCode } from '@_/customTypes/userType';
import {Response} from 'express';

// authService를 모아두는 클래스
class authService {
    static async loginService (code: string, sns_code: string) {
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
    static async joinService (nickname: string, name: string, email: string, snsCode: SnsCode, image?: string) {
        const createdUser = await UserModel.initiateUserFromOauth({nickname, name, email, image, snsCode});
        if (!createdUser) {
            throw new InternalServerError('유저를 생성하는 데 실패했습니다.');
        }
        return setAccessToken(createdUser.id);
    }
    // 로그아웃 서비스
    static async logoutService (res: Response) {
        // accessToken 삭제
        res.clearCookie('accessToken');
        // refreshToken 구현 시 추가
        // res.clearCookie('refreshToken')

        return;
    }
    // 회원탈퇴 서비스
    static async deleteService (userId: number) {
        await UserModel.softDelete(userId);
        return;
    }
}

export default authService;