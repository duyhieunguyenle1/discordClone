import { NextFunction, Response, Request } from 'express';
import createHttpError from 'http-errors';

import Channel from '../models/channel.model';
import { StatusCodes } from 'http-status-codes';
import { ChannelType } from '../types/channel.types';

const createNewChannel = async (req: Request, res: Response, next: NextFunction) => {
  const { name, type } = req.body;
  const serverId = req.params.id;

  if (!name) {
    return next(createHttpError.Unauthorized('Please enter your channel name to continue'));
  }

  if (!serverId) {
    return next(createHttpError.Unauthorized('Channel must be created in a server'));
  }

  const channel = await Channel.create({ name, type, server: serverId });

  return res.status(StatusCodes.CREATED).json({ channel });
};

const createChannelByDefault = async (type: ChannelType, serverId: string, next: NextFunction) => {
  if (!serverId) {
    return next(createHttpError.BadRequest('Channel must be created in a server'));
  }

  const channel = await Channel.create({ server: serverId, name: 'General', type: type });

  return channel._id;
};

export { createNewChannel, createChannelByDefault };
