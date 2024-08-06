import axios from 'axios';
import qs from 'querystring';

import { googleClientId, googleClientPw, googleRedirectUri, naverClientId, naverClientPw } from "@_/config";
import { SnsCode } from '@_/customTypes/userType';

class AxiosModel {
    static async getProfileGoogle(code: string) {
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
        
        const accessToken = tokens.access_token;
        
        const response = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          });
        const profile:any = response.data;
        return {
            name: profile.name as string,
            email: profile.email as string,
            image: profile.picture as string|undefined,
            snsCode: SnsCode.google,
        };
    }

    static async getProfileNaver(code: string) {
        const tokenResponse: Axios.AxiosXHR<any> = await axios.get('https://nid.naver.com/oauth2.0/token', {
            params: {
                grant_type: 'authorization_code',
                client_id: naverClientId,
                client_secret: naverClientPw,
                code,
            }
        });
    
        const accessToken = tokenResponse.data.access_token;
        // 사용자 프로필 요청
        const profileResponse = await axios.get('https://openapi.naver.com/v1/nid/me', {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        
        const result:any = profileResponse.data;
        const profile = result.response;
        return {
            name: profile.name,
            email: profile.email,
            image: profile.profile_image,
            snsCode: SnsCode.naver,
        };
    }
}

export default AxiosModel;