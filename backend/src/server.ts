import { createServer } from 'http';
import { v2 as cloudinary } from 'cloudinary';

import { registerSocketServer } from './socketServer';
import app from './app';
import connectDB from './config/connectDB';
import config from './config';

const PORT = config.development.api_port;

const server = createServer(app);
registerSocketServer(server);

process.on('uncaughtException', err => {
  console.log(`ERROR: ${err.message}`);
  console.log('Shutting down due to uncaught exception');
  process.exit(1);
});

// Setting up cloudinary configuration
cloudinary.config({
  cloud_name: config.cloudinary.cloudinary_name,
  api_key: config.cloudinary.cloudinary_key,
  api_secret: config.cloudinary.cloudinary_secret,
});

const start = async () => {
  try {
    await connectDB(config.database.database_url!);
    server.listen(PORT, () => {
      console.log(`Server is listening on ${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
