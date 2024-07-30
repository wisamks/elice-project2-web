import {Strategy as JwtStrategy, StrategyOptions} from 'passport-jwt';
import jwt from 'jsonwebtoken';
import {Request} from 'express';

import {jwtAccessTokenSecret} from '@_config';

const cookieExtractor = (req: Request) => {
  if (req && req.cookies) {
    console.log(req.cookies.accessToken);
    return req.cookies.accessToken;
  }
  return null;
}

const opts: StrategyOptions = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: jwtAccessTokenSecret,
};

export default new JwtStrategy(opts, (jwt_payload, done) => {
  return done(null, {userId: jwt_payload.userId});
});