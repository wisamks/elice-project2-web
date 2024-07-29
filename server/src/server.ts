import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import passport from 'passport';

import { serverPort } from './config';
import authRouter from './routers/authRouter';
import usersRouter from './routers/usersRouter';
import authenticateAccessToken from './middlewares/authenticateJWT';
import passportConfig from './passport-config';
passportConfig();

const clientDomain = 'localhost:3000';
const port: number = Number(serverPort);
const app: Application = express();

app.use(cors({
    origin: clientDomain,
    credentials: true,
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(passport.initialize());

app.get('/', (req: Request, res: Response) => {
    res.send('hello typescript');
})

// 임시
app.get('/profile', authenticateAccessToken, (req: Request, res: Response) => {
    console.log(req.cookies.jwt);
    res.json({token:req.cookies});
})

//라우터
app.use('/api/auth', authRouter);
app.use('/api/users', usersRouter);

app.listen(port, () => {
    console.log(`server started on Port ${port}`);
});