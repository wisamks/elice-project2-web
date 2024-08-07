import { Request, Response, NextFunction } from 'express';

import FavoriteService from '@_services/favoriteService';
import PostGetOneDTO from '@_/middlewares/DTOs/postGetOneDTO';

class FavoriteController {
    static async toggleFavorite(req: Request, res: Response, next: NextFunction) {
        try {
            const { postId, userId }: PostGetOneDTO = req.body;
            await FavoriteService.toggleFavorite(postId, userId);
            return res.status(204).end();
        } catch(err) {
            return next(err);
        }
    }
}

export default FavoriteController;