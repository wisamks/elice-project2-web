import { Router, Request, Response, NextFunction } from 'express';

import { loginController } from '@_controllers/authController';

const router = Router();

// 로그인 
router.post('/login', loginController)

// 회원가입 (비활성화) - 확인필요
router.post('/join', (req: Request, res: Response) => {
    res.send('회원가입');
});

// 로그아웃
router.post('/logout', (req: Request, res: Response) => {
    res.send('로그아웃');
});

// 회원탈퇴
router.delete('/', (req: Request, res: Response) => {
    res.send('회원탈퇴');
});

// 이메일 인증
router.post('/email', (req: Request, res: Response) => {
    res.send('이메일 인증');
});

// 휴대폰 인증
router.post('/phone', (req: Request, res: Response) => {
    res.send('휴대폰 인증');
});

// 인증번호 확인
router.post('/code', (req: Request, res: Response) => {
    res.send('인증번호 확인');
});

export default router;
