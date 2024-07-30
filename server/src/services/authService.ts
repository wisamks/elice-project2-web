import axios from 'axios';
import { googleClientId, googleClientPw, googleRedirectUri, naverClientId, naverClientPw, naverRedirectUri } from '@_config';
import qs from 'querystring';

// authService를 모아두는 클래스
class authService {
    static async loginService (code: string, sns_code: string) {
        try {
            let profile;
            if (sns_code === 'google') {
                // const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', new URLSearchParams({
                //     code,
                //     client_id: googleClientId,
                //     client_secret: googleClientPw,
                //     redirect_uri: googleRedirectUri,
                //     grant_type: 'authorization_code'
                // }).toString(), {
                //     headers: {
                //         'Content-Type': 'application/x-www-form-urlencoded'
                //     }
                // });
                const tokenData = qs.stringify({
                    code: code,
                    client_id: googleClientId,
                    client_secret: googleClientPw,
                    redirect_uri: googleRedirectUri,
                    grant_type: 'authorization_code'
                  });
              
                  const tokenResponse = await axios.post('https://oauth2.googleapis.com/token', tokenData, {
                    headers: {
                      'Content-Type': 'application/x-www-form-urlencoded'
                    }
                  });

                  const tokens: any = tokenResponse.data;
                  console.log(tokens);

                  const accessToken = tokens.access_token;
        
                console.log(accessToken);
                const response = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
                    headers: {
                      Authorization: `Bearer ${accessToken}`
                    }
                  });
                profile = response.data;
            } else if (sns_code === 'naver') {
                const tokenResponse: Axios.AxiosXHR<any> = await axios.get('https://nid.naver.com/oauth2.0/token', {
                    params: {
                        grant_type: 'authorization_code',
                        client_id: naverClientId,
                        client_secret: naverClientPw,
                        code,
                    }
                });
        
                const accessToken = tokenResponse.data.access_token;
                console.log(accessToken);
                // 사용자 프로필 요청
                const profileResponse = await axios.get('https://openapi.naver.com/v1/nid/me', {
                    headers: {
                        Authorization: `Bearer ${accessToken}`
                    }
                });
                
                const result:any = profileResponse.data;
                profile = result.response;
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