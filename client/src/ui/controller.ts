import express from 'express';
import path from 'path';
const app = express();

import { RenderHtml } from '../utils/web';
const htmlDir = __dirname + '/views';

app.get('/', (req, res) => {
    RenderHtml(res, path.join(htmlDir, 'index.html'));
})

export default app;