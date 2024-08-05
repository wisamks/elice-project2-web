import UsersController from '@_/controllers/usersController';
import { authenticateAccessToken } from '@_/middlewares';
import { Router, Request, Response } from 'express';

const router = Router();

// 유저 프로필 조회
router.get('/profile', authenticateAccessToken, UsersController.getProfile);

// 닉네임 변경
router.put('/nickname', (req: Request, res: Response) => {
    res.send('닉네임 변경');
});

// 프로필사진 변경
router.put('/image', (req: Request, res: Response) => {
    res.send('프로필사진 변경');
});

export default router;
