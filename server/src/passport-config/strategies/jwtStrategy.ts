import {Strategy as JwtStrategy, ExtractJwt, StrategyOptions} from 'passport-jwt';
import {jwtAccessTokenSecret} from '../../config';
import {Request} from 'express';

const cookieExtractor = (req: Request) => {
  const { token } = req.cookies;
  return token;
};

const opts: StrategyOptions = {
  jwtFromRequest: cookieExtractor,
  secretOrKey: jwtAccessTokenSecret,
};

export default new JwtStrategy(opts, (jwt_payload, done) => {
  console.log(jwt_payload);
  return done(null, jwt_payload);
});