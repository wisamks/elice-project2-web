import UsersController from '@_/controllers/usersController';
import { authenticateAccessToken, validator } from '@_/middlewares';
import AuthUserDTO from '@_/middlewares/DTOs/authUserDTO';
import UserUpdateDTO from '@_/middlewares/DTOs/userUpdateDTO';
import { Router } from 'express';

const router = Router();

// 유저 프로필 조회
router.get('/profile', authenticateAccessToken, validator(AuthUserDTO), UsersController.getProfile);

// 유저 프로필 변경
router.put('/profile', authenticateAccessToken, validator(UserUpdateDTO), UsersController.updateProfile);

export default router;
