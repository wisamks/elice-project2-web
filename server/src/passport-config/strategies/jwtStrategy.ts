import {Strategy as JwtStrategy, ExtractJwt, StrategyOptions} from 'passport-jwt';
import jwt from 'jsonwebtoken';

import {jwtAccessTokenSecret} from '@_config';

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: jwtAccessTokenSecret,
};

export default new JwtStrategy(opts, (jwt_payload, done) => {
  const user = jwt.verify(jwt_payload.accessToken, jwtAccessTokenSecret);
  return done(null, user);
});