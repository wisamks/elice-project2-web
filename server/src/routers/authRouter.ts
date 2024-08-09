import { Router, Request, Response } from 'express';

import AuthController from '@_controllers/authController';

import { authenticateAccessToken, validator } from '@_middlewares';
import AuthLoginDTO from '@_/middlewares/DTOs/authLoginDTO';
import AuthNicknameDTO from '@_/middlewares/DTOs/authNicknameDTO';
import AuthUserDTO from '@_/middlewares/DTOs/authUserDTO';

const router = Router();

// 로그인 
router.post('/login', validator(AuthLoginDTO), AuthController.login);

// 닉네임 중복 확인
router.post('/nickname', validator(AuthNicknameDTO), AuthController.checkNickname);

// 회원가입
router.post('/join', validator(AuthNicknameDTO), AuthController.join);

// 로그아웃
router.post('/logout', authenticateAccessToken, AuthController.logout);

// 회원탈퇴
router.delete('/', authenticateAccessToken, validator(AuthUserDTO), AuthController.delete);

// accessToken 유효한지 확인
router.get('/access', authenticateAccessToken, (req: Request, res: Response) => {
    res.status(200).json({ message: "로그인이 되어있습니다."});
});

// refresh 토큰으로 accessToken 재발급
router.post('/refresh', AuthController.getTokenFromRefresh);

export default router;
