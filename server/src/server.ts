import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import passport from 'passport';

import { serverPort } from '@_config';
import authRouter from '@_routers/authRouter';
import usersRouter from '@_routers/usersRouter';
import authenticateAccessToken from '@_middlewares/authenticateJWT';
import passportConfig from '@_passport-config';
passportConfig();

const clientDomain = 'http://localhost:3000';
const port: number = Number(serverPort);
const app: Application = express();
// 클라이언트가 다른 포트에서 api를 호출할 수 있게 하는 설정
app.use(cors({
    origin: clientDomain,
    credentials: true,
}))
// body랑 cookie를 읽을 수 있도록 하는 설정
// 만약 쿠키 secret 설정을 하게 된다면 cookieParser(해당 시크릿) 으로 넣어줘야 함
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(passport.initialize()); // 패스포트 초기화

// 임시 동작 확인용: 나중에 삭제
app.get('/', (req: Request, res: Response) => {
    res.send('hello typescript');
})

// 임시 jwt 인증 관련 테스트용: 나중에 로그인 완성되면 삭제하기
app.get('/profile', authenticateAccessToken, (req: Request, res: Response) => {
    return res.json(req.user);
})

//라우터
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);

app.listen(port, () => {
    console.log(`server started on Port ${port}`);
});