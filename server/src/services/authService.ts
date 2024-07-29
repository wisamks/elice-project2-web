import axios from 'axios';

class authService {
    static async loginService (token: string, sns_code: string) {
        try {
            let profile;
            if (sns_code === 'google') {
                const response = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${token}`);
                profile = response.data;
            } else if (sns_code === 'naver') {
                const response: any = await axios.get('https://openapi.naver.com/v1/nid/me', { headers: {Authorization: `Bearer ${token}`}});
                profile = response.data.response;
            }
            const user = {
                name: profile.name,
                email: profile.email
            };
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