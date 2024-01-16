import 'express-async-errors';
import express, { Express } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import {
  notFound,
  errorMiddleware,
} from './middleware/errors.middlewares';
import connectDB from './config/connectDB';
import AuthRoutes from './routes/auth.routes';
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();

app.use(express.json());
// app.use(
//   cors({
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true,
//     origin: 'http://localhost:5173',
//   }),
// );
app.use(cookieParser());

app.use('/api/v1/auth', AuthRoutes);

app.use(notFound);
app.use(errorMiddleware);
console.log('hi');

const PORT =
  process.env.PORT || process.env.API_PORT || 5001;
const start = async () => {
  try {
    await connectDB(process.env.DATABASE_URL!);
    app.listen(PORT, () => {
      console.log(`Server is listening on ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
