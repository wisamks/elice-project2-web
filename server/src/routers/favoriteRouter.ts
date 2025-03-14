import { Router } from 'express';

import FavoriteController from '@_/controllers/favoriteController';
import { authenticateAccessToken, validator } from '@_/middlewares';
import PostGetOneDTO from '@_/middlewares/DTOs/postGetOneDTO';

const router = Router();

router.post('/', authenticateAccessToken, validator(PostGetOneDTO), FavoriteController.toggleFavorite);

export default router;