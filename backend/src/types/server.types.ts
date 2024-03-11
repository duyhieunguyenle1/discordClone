import { ObjectId } from 'mongoose';

interface IServer {
  _id: string;
  channels: ObjectId[];
  name: string;
  imgUrl?: string;
  inviteCode: string;
}

export { IServer };
