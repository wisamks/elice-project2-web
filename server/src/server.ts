import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import passport from 'passport';

import { clientDomain } from '@_config';
import { serverPort } from '@_config';
import authRouter from '@_routers/authRouter';
import usersRouter from '@_routers/usersRouter';
import exchangePostsRouter from '@_routers/exchangePostsRouter';

import passportConfig from '@_passport-config';
passportConfig();

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

// 임시 동작 확인용: 나중에 삭제!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!꼭!!!!!!!!!!!!!!!!!!!!!!!
app.get('/', (req: Request, res: Response) => {
    res.send('hello typescript');
})

//라우터
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);
app.use('/api/exchange-posts', exchangePostsRouter);

// 에러 핸들링 미들웨어
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err.statusCode >= 500 || !err.statusCode) {
        console.error(err);
    }
    const statusCode = err.statusCode >= 400 ? err.statusCode : 400;
    const message = err.message ? err.message : '에러가 발생했습니다.';
    return res.status(statusCode).json({ error: message });
});


app.listen(serverPort, () => {
    console.log(`server started on Port ${serverPort}`);
});