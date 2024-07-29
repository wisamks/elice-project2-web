import passport from 'passport';

import jwt from '@_passport-config/strategies/jwtStrategy';

export default () => {
    passport.use(jwt);
};