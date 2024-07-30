import { Router, Request, Response, NextFunction } from 'express';

import authController from '@_controllers/authController';

import { validateNickname } from '@_middlewares/validateNickname';

const router = Router();

// 로그인 
router.post('/login', authController.loginController);

// 닉네임 중복 확인
router.post('/nickname', authController.nicknameController);

// 회원가입
router.post('/join', authController.joinController);

// 로그아웃
router.post('/logout', authController.logoutController);

// 회원탈퇴
router.delete('/', authController.deleteController);

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
