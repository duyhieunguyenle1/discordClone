import { Response, Request } from 'express';
import { MongoError } from 'mongodb';
import CustomErrorAPI from '../handlers/error.handler';
import { StatusCodes } from 'http-status-codes';
import { NextFunction } from 'connect';

const notFound = (req: Request, res: Response) => {
  res.status(StatusCodes.NOT_FOUND).json({
    message: 'This route does not exist',
    status: 'failed',
  });
};

const errorMiddleware = (err: CustomErrorAPI, req: Request, res: Response, next: NextFunction) => {
  err.message = err.message || 'Internal Server Error';
  err.statusCode = err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR;

  if (err.name === 'CastError') {
    const msg = `Resources not found. Invalid!`;
    err.message = msg;
    err.statusCode = StatusCodes.NOT_FOUND;
  }

  if (err instanceof MongoError) {
    if (err.code === 11000) {
      err.statusCode = StatusCodes.BAD_REQUEST;
    }
  }

  return res.status(err.statusCode).json({
    msg: err.message,
    status: 'failed',
    stack: process.env.NODE_ENV === 'DEVELOPMENT' ? err.stack : {},
  });
};

export { notFound, errorMiddleware };
