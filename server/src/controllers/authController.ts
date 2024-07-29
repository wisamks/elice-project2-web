import { Request, Response, NextFunction } from 'express';
import { setAccessToken } from '../utils';
import authService from '../services/authService';

const loginController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { token, sns_code } = req.body;
        const user: any = await authService.loginService(token, sns_code);
        setAccessToken(res, user);
        return res.redirect('/');
    } catch (err) {
        return next(err);
    }
}

export {
    loginController,
};