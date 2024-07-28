import express, { Application, Request, Response } from 'express';
import cors from 'cors';

import { serverPort } from './config';

const clientDomain = 'localhost:3000';
const port: number = Number(serverPort);
const app: Application = express();

app.use(cors({
    origin: clientDomain,
    credentials: true,
}))

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.get('/', (req: Request, res: Response) => {
    res.send('hello typescript');
})

app.listen(port, () => {
    console.log(`server started on Port ${port}`);
});