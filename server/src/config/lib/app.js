import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import { config } from './config.js';

const app = express();

app.use(
  cors({
    origin: [config.clientOrigin],
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan('dev'));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

export { app };

