import express, { Express } from 'express';
import 'express-async-errors'; // wrapper async error
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';

import { notFound, errorMiddleware } from './middleware/errors.middlewares';
import router from './routes';

const app: Express = express();

app.use(express.json());
app.use(helmet());
app.use(
  cors({
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    origin: ['http://localhost:5173', 'https://spdx.org/licenses'],
  }),
);
app.use(cookieParser());

app.use('/api/v1', router);

app.use(notFound);
app.use(errorMiddleware);

export default app;
