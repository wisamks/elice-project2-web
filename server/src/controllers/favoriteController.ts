import { Request, Response, NextFunction } from 'express';
import { ReqUser } from '@_/customTypes/express';

import FavoriteService from '@_services/favoriteService';

class FavoriteController {
    static async toggleFavorite(req: Request, res: Response, next: NextFunction) {
        try {
            const { postId } = req.body;
            const user = req.user as ReqUser;
            const userId = user.userId;
            await FavoriteService.toggleFavorite(Number(postId), userId);
            return res.status(204).end();
        } catch(err) {
            return next(err);
        }
    }
}

export default FavoriteController;