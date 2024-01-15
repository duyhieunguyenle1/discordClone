import { Request, Response, NextFunction } from 'express';
import createHttpError from 'http-errors';
import CustomErrorAPI from '../handlers/error.handler';

type AsyncCallback = (
  req: Request,
  res: Response,
  next: NextFunction,
) => Promise<any>;

const asyncWrapper = (callback: AsyncCallback) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      await callback(req, res, next);
    } catch (error) {
      next(error)
      // console.log(error)
    }
  };
};

export default asyncWrapper;
