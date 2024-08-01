import { Router, Request, Response, NextFunction } from 'express';

import AuthController from '@_controllers/authController';

import { validateNickname } from '@_middlewares/validateNickname';
import authenticateAccessToken from '@_middlewares/authenticateJWT';

const router = Router();

// 로그인 
router.post('/login', AuthController.login);

// 닉네임 중복 확인
router.post('/nickname', AuthController.checkNickname);

// 회원가입
router.post('/join', AuthController.join);

// 로그아웃
router.post('/logout', authenticateAccessToken, AuthController.logout);

// 회원탈퇴
router.delete('/', authenticateAccessToken, AuthController.delete);

// accessToken 유효한지 확인
router.get('/token', authenticateAccessToken, (req, res) => {
    res.status(200).json({ message: "로그인이 되어있습니다."});
});

// refresh 토큰으로 accessToken 재발급
router.post('/token', AuthController.getTokenFromRefresh);

// // 이메일 인증
// router.post('/email', (req: Request, res: Response) => {
//     res.send('이메일 인증');
// });

// // 휴대폰 인증
// router.post('/phone', (req: Request, res: Response) => {
//     res.send('휴대폰 인증');
// });

// // 인증번호 확인
// router.post('/code', (req: Request, res: Response) => {
//     res.send('인증번호 확인');
// });

// // 닉네임 유효성 검사 엔드포인트
// router.post('/validate-nickname', validateNickname, (req, res) => {
//     res.status(200).json({ message: '사용 가능한 닉네임입니다.' });
// });

export default router;
