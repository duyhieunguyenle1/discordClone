import { NextFunction, Request, Response } from 'express';
import User from '../models/user.model';
import createHttpError from 'http-errors';
import { StatusCodes } from 'http-status-codes';

const getAllUsers = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.cookies['userId'];

  if (!userId) {
    return next(createHttpError.Unauthorized('Please login to continue'));
  }

  const users = await User.find({ _id: { $ne: userId } });

  if (!users) {
    return res.status(StatusCodes.OK).json({ user: {} });
  }

  return res.status(StatusCodes.OK).json({ users });
};

const getCurrentUser = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.cookies['userId'];

  if (!userId) {
    return next(createHttpError.Unauthorized('Please login to continue'));
  }

  const user = await User.findOne({ _id: userId });

  if (!user) {
    return next(createHttpError.NotFound('Not find any user'));
  }

  return res.status(StatusCodes.OK).json({ user });
};

const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.id;

  if (!userId) {
    return next(createHttpError[404]('UserId not acceptable'));
  }

  const user = await User.findById(userId);

  if (!user) {
    return next(createHttpError.NotFound('Not found any user'));
  }

  return res.status(StatusCodes.OK).json({ user });
};

export { getAllUsers, getCurrentUser, getUserById };
