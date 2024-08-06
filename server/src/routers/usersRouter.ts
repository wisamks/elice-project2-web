import UsersController from '@_/controllers/usersController';
import { authenticateAccessToken } from '@_/middlewares';
import { Router } from 'express';

const router = Router();

// 유저 프로필 조회
router.get('/profile', authenticateAccessToken, UsersController.getProfile);

// 유저 프로필 변경
router.put('/profile', authenticateAccessToken, UsersController.updateProfile);

export default router;
