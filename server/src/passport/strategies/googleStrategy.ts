import GoogleStrategy from 'passport-google-oauth20';
import { googleClientId, googleClientPw } from '../../config';

const config = {
    clientID: googleClientId,
    clientSecret: googleClientPw,
    callbackURL: '/api/auth/google/callback',
};