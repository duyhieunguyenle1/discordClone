import { ObjectId } from 'mongoose';

enum ChannelType {
  TEXT = 'Text',
  VIDEO = 'Video',
  AUDIO = 'Audio',
}

interface IChannel {
  _id: string;
  server: ObjectId;
  name: string;
  type: string;
}

export { IChannel, ChannelType };
