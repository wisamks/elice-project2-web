import { Router, Request, Response } from 'express';

const router = Router();

// 유저 프로필 조회
router.get('/:userId', (req: Request, res: Response) => {
    const { userId } = req.params;
    res.send(`유저 프로필 조회: ${userId}`);
});

// 닉네임 변경
router.put('/nickname', (req: Request, res: Response) => {
    res.send('닉네임 변경');
});

// 휴대폰 번호 변경
router.put('/phone', (req: Request, res: Response) => {
    res.send('휴대폰 번호 변경');
});

// 프로필사진 변경
router.put('/image', (req: Request, res: Response) => {
    res.send('프로필사진 변경');
});

export default router;
