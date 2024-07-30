import axios from 'axios';

import { naverClientId, naverClientPw } from '@_config';

const getProfileNaver = async (code: string) => {
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
        snsCode: 'naver',
    };
}

export default getProfileNaver;