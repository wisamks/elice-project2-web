import { ReqUser } from '@_/customTypes/express';
import UsersService from '@_/services/usersService';
import { Request, Response, NextFunction } from 'express';

class UsersController {
    static async getProfile(req: Request, res: Response, next: NextFunction) {
        const user = req.user as ReqUser;
        const userId = user.userId;
        try {
            const foundProfile = await UsersService.getProfile(userId);
            return res.status(200).json(foundProfile);
        } catch(err) {
            return next(err);
        }
    }
}

export default UsersController;