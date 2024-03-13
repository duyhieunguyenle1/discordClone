import { NextFunction, Request, Response } from 'express';
import createHttpError from 'http-errors';
import otpGenerator from 'otp-generator';
import { StatusCodes } from 'http-status-codes';

import Server from '../models/server.model';
import User from '../models/user.model';
import { ObjectId } from 'mongoose';
import { createChannelByDefault, createNewChannel } from './channel.controller';
import { ChannelType } from '../types/channel.types';

const createNewServer = async (req: Request, res: Response, next: NextFunction) => {
  const { img, name } = req.body;
  const { userId } = req.cookies;

  if (!name) {
    return next(createHttpError.NotFound('Server name is required'));
  }

  let inviteCode = otpGenerator.generate(8, {
    lowerCaseAlphabets: false,
    specialChars: false,
    upperCaseAlphabets: false,
  });

  const isServerExist = await Server.findOne({ inviteCode });

  if (isServerExist) {
    while (isServerExist) {
      inviteCode = otpGenerator.generate(8, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars: false,
      });
    }
  }

  const server = await Server.create({ imgUrl: img, name, inviteCode, owner: userId });

  const user = await User.findOne({ _id: userId });

  if (!user) {
    return next(createHttpError.NotFound('Please login first'));
  }

  const serverId = server._id as unknown as ObjectId;

  user.servers = [...user.servers, serverId];

  await user.save();

  const channel1 = (await createChannelByDefault(
    ChannelType.TEXT,
    server._id,
    next,
  )) as unknown as ObjectId;
  const channel2 = (await createChannelByDefault(
    ChannelType.AUDIO,
    server._id,
    next,
  )) as unknown as ObjectId;
  const channel3 = (await createChannelByDefault(
    ChannelType.VIDEO,
    server._id,
    next,
  )) as unknown as ObjectId;

  server.channels = [...server.channels, channel1, channel2, channel3];

  await server.save();

  return res.status(StatusCodes.OK).json({ server });
};

const getServerByCode = async (req: Request, res: Response, next: NextFunction) => {
  const { inviteCode } = req.body;

  if (!inviteCode) {
    return next(createHttpError.NotAcceptable('Please enter valid code'));
  }

  const server = await Server.findOne({ inviteCode });

  if (!server) {
    return next(createHttpError.NotFound('Not found any server'));
  }

  return res.status(StatusCodes.OK).json({ server });
};

export { createNewServer, getServerByCode };
