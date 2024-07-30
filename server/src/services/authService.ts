import { getProfileGoogle, getProfileNaver } from '@_utils';

// authService를 모아두는 클래스
class authService {
    static async loginService (code: string, sns_code: string) {
        try {
            let user;
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
}

export default authService;