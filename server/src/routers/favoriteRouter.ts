import { Router } from 'express';

import FavoriteController from '@_/controllers/favoriteController';
import { authenticateAccessToken } from '@_/middlewares';

const router = Router();

router.post('/', authenticateAccessToken, FavoriteController.toggleFavorite);

export default router;