import express, { Application, Request, Response } from 'express';

const port: number = 8080;
const app: Application = express();

app.get('/', (req: Request, res: Response) => {
    res.send('hello typescript');
})

app.listen(port, () => {
    console.log(`server started on Port ${port}`);
});