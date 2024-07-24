import express from 'express';
const port = 8080;
const app = express();
app.get('/', (req, res) => {
    res.send('hello typescript');
});
app.listen(port, () => {
    console.log(`server started on Port ${port}`);
});
