import { Socket } from 'socket.io';
import { isTokenExpired, verifyAccessToken } from '../utils/jwt';
import { ExtendedError } from 'socket.io/dist/namespace';
import createHttpError from 'http-errors';

const verifySocketToken = (socket: Socket, next: (err?: ExtendedError) => void) => {
  const token = socket.handshake.auth?.token;

  if (isTokenExpired(token)) {
    const socketError = new createHttpError.Unauthorized('Token Expired');
    next(socketError);
  }

  try {
    const decoded = verifyAccessToken(token);
    socket.user = decoded;
  } catch (error) {
    const socketError = new createHttpError.Unauthorized('Not authorized');
    next(socketError);
  }

  next();
};

export { verifySocketToken };
