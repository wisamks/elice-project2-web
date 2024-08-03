import { Request, Response, NextFunction } from 'express';
import { ReqUser } from '@_/customTypes/express';

import FavoriteService from '@_services/favoriteService';

class FavoriteController {
    static async createFavorite(req: Request, res: Response, next: NextFunction) {
        try {
            const { postId } = req.body;
            const user = req.user as ReqUser;
            const userId = user.userId;
            await FavoriteService.createFavorite(Number(postId), userId);
            return res.status(201).end();
        } catch(err) {
            return next(err);
        }
    }

    static async deleteFavorite(req: Request, res: Response, next: NextFunction) {
        try {
            const { postId } = req.query;
            const user = req.user as ReqUser;
            const userId = user.userId;
            await FavoriteService.deleteFavorite(Number(postId), userId);
            return res.status(204).end();
        } catch(err) {
            return next(err);
        }
    }
}

export default FavoriteController;