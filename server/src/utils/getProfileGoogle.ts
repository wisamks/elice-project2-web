import axios from 'axios';
import qs from 'querystring';

import { googleClientId, googleClientPw, googleRedirectUri } from "@_/config";

const getProfileGoogle = async (code: string) => {
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
    
    console.log(accessToken);
    const response = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo?alt=json', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    const profile:any = response.data;
    console.log(profile);
    return {
        name: profile.name,
        email: profile.email,
        image: profile.picture,
        // phone: profile.phone,
    };
}

export default getProfileGoogle;