import { ObjectId } from 'mongoose';

interface IMessage {
  _id: ObjectId;
  author: ObjectId;
  content: string;
  img?: string;
  type: string;
}

interface ContentSchema {
  content: string;
  img?: string;
}

interface ContentSocket extends ContentSchema {
  receiverId: string;
}

export { IMessage, ContentSocket };
