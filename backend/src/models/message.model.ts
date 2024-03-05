import mongoose, { Schema, Model } from 'mongoose';
import { IMessage } from '../types/message.types';

type MessageModel = Model<IMessage>;

const MessageSchema: Schema = new mongoose.Schema<IMessage>(
  {
    author: { type: Schema.Types.ObjectId, ref: 'User' },
    content: { type: String },
    img: { type: String },
    type: { type: String },
  },
  { timestamps: true },
);

export default mongoose.model<IMessage, MessageModel>('Message', MessageSchema);
