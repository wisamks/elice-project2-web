import { ReqUser } from '@_/customTypes/express';
import AuthUserDTO from '@_/middlewares/DTOs/authUserDTO';
import UserUpdateDTO from '@_/middlewares/DTOs/userUpdateDTO';
import UsersService from '@_/services/usersService';
import { Request, Response, NextFunction } from 'express';

class UsersController {
    static async getProfile(req: Request, res: Response, next: NextFunction) {
        const { userId }: AuthUserDTO = req.body;
        try {
            const foundProfile = await UsersService.getProfile(userId);
            return res.status(200).json(foundProfile);
        } catch(err) {
            return next(err);
        }
    }

    static async updateProfile(req: Request, res: Response, next: NextFunction) {
        const data: UserUpdateDTO = req.body;
        try {
            await UsersService.updateProfile(data);
            return res.status(204).end();
        } catch(err) {
            return next(err);
        }
    }
}

export default UsersController;