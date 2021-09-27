import express from 'express';
import cors from 'cors';
import { GetCookies, GetCookie } from '../utils/web';

const app = express();
app.use(cors);

app.get('/',  (req, res) => {
    res.end(JSON.stringify(GetCookies(req)));
});

app.get('/:key', (req, res) => {
    const key = req.params.key;
    res.end(GetCookie(req, key));
})

export default app;
