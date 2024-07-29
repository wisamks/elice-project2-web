import passport from 'passport';

import jwt from './strategies/jwtStrategy';

export default () => {
    passport.use(jwt);
};