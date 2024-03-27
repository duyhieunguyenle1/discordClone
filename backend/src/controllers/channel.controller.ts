import { NextFunction, Response, Request } from 'express';
import createHttpError from 'http-errors';
import { StatusCodes } from 'http-status-codes';

import { ChannelType, IChannel } from '../types/channel.types';
import Channel from '../models/channel.model';
import Server from '../models/server.model';

const createNewChannel = async (req: Request, res: Response, next: NextFunction) => {
  const { name, type } = req.body;
  const { id: serverId } = req.params;

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

const getAllChannelsOfServer = async (req: Request, res: Response, next: NextFunction) => {
  const { id: serverId } = req.params;

  if (!serverId) {
    return next(createHttpError.NotAcceptable('You must be in a server route'));
  }

  const server = await Server.findOne({ _id: serverId });

  if (!server) {
    return next(createHttpError.NotFound('Server not found'));
  }

  let channels: IChannel[] = [];
  await Promise.all(
    server.channels.map(async channelId => {
      const channel = await Channel.findOne({ _id: channelId.toString() });

      if (channel) {
        channels.push(channel);
      }
    }),
  );

  return res.status(StatusCodes.OK).json({ channels });
};

const getChannelOfServer = async (req: Request, res: Response, next: NextFunction) => {
  const { id1: serverId, id2: channelId } = req.params;

  if (!serverId) {
    return next(createHttpError.NotFound('Server id is required'));
  }

  if (!channelId) {
    return next(createHttpError.NotFound('Channel id is required'));
  }

  const channel = await Channel.findOne({ _id: channelId, server: serverId });

  if (!channel) {
    return next(createHttpError.NotFound('Channel is not existed'));
  }

  return res.status(StatusCodes.OK).json({ channel });
};

export { createNewChannel, createChannelByDefault, getAllChannelsOfServer, getChannelOfServer };
