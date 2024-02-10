import { createServer } from 'http';
import dotenv from 'dotenv';

import { registerSocketServer } from './socketServer';
import app from './app';
import connectDB from './config/connectDB';
dotenv.config();

const PORT = process.env.PORT || process.env.API_PORT || 5001;

const server = createServer(app);
registerSocketServer(server);

process.on('uncaughtException', err => {
  console.log(`ERROR: ${err.message}`);
  console.log('Shutting down due to uncaught exception');
  process.exit(1);
});

const start = async () => {
  try {
    await connectDB(process.env.DATABASE_URL!);
    server.listen(PORT, () => {
      console.log(`Server is listening on ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
