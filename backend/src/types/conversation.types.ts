import { ObjectId } from 'mongoose';

interface IConversation {
  _id: string;
  participants: ObjectId[];
  messages: ObjectId[];
}

export { IConversation };
