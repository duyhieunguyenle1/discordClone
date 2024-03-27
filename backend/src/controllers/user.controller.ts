import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import { StatusCodes } from 'http-status-codes';

import User from '../models/user.model';
import Server from '../models/server.model';
import Member from '../models/member.model';
import { IUser } from '../types/user.types';

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

const getAllFriendsNotInServer = async (req: Request, res: Response, next: NextFunction) => {
  const { serverId } = req.body;
  const { user_id } = req.user;

  if (!user_id) {
    return next(createHttpError.NotAcceptable('User id is required'));
  }

  if (!serverId) {
    return next(createHttpError.NotAcceptable('Server id is required'));
  }

  const user = await User.findOne({ _id: user_id });

  if (!user) {
    return next(createHttpError.NotFound('Not found user'));
  }

  const server = await Server.findOne({ _id: serverId });

  if (!server) {
    return next(createHttpError.NotFound('Not found any server'));
  }

  let friendIds: string[] = [];
  let friends: IUser[] = [];
  await Promise.all(
    user.friends.map(async friend => {
      const isMember = await Member.findOne({ user_id: friend.toString(), server: serverId });

      if (!isMember) {
        friendIds.push(friend.toString());
      }
    }),
  );

  await Promise.all(
    friendIds.map(async friendId => {
      const friend = await User.findOne({ _id: friendId });

      if (friend) {
        friends.push(friend);
      }
    }),
  );

  return res.status(StatusCodes.OK).json({ users: friends });
};

export { getAllUsers, getCurrentUser, getUserById, getAllFriendsNotInServer };
