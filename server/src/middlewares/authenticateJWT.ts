import {Request, Response, NextFunction} from 'express';
import passport from 'passport';

const authenticateAccessToken = (req: Request, res: Response, next: NextFunction) => {
    if (!req.cookies) {
        next();
        return;
      }
      console.log(req.cookies.jwt)
      return passport.authenticate('jwt', { session: false })(req, res, next);
}

export default authenticateAccessToken;