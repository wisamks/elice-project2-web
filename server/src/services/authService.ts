import { getProfileGoogle, getProfileNaver } from '@_utils';
import UserModel from '@_models/userModel';
import { InternalServerError } from '@_/utils/customError';
import { setAccessToken } from '@_utils';
import { SnsCode } from '@_/customTypes/userType';

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
    static async joinService (nickname: string, name: string, email: string, image?: string, snsCode: SnsCode) {
        const createdUser = await UserModel.initiateUserFromOauth({nickname, name, email, image, snsCode});
        if (!createdUser) {
            throw new InternalServerError('유저를 생성하는 데 실패했습니다.');
        }
        return setAccessToken(createdUser.id);
    }
}

export default authService;