import { Socket } from 'socket.io';
import { PayloadType } from './utils/jwt';

declare global {
  namespace Express {
    export interface Request {
      user: PayloadType;
    }
  }
}

declare module 'socket.io' {
  export interface Socket {
    user: PayloadType;
  }
}

declare module 'express-async-errors';
