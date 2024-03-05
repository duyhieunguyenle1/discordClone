import mongoose, { Schema, Model } from 'mongoose';
import { IConversation } from '../types/conversation.types';

type ConversationModel = Model<IConversation>;

const ConversationSchema: Schema = new mongoose.Schema<IConversation>(
  {
    participants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
  },
  { timestamps: true },
);

export default mongoose.model<IConversation, ConversationModel>('Conversation', ConversationSchema);
