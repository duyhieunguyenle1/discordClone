import mongoose, { Schema, Model } from 'mongoose';
import { IFriend } from '../types/friend.types';

type FriendModel = Model<IFriend>;

const FriendSchema: Schema = new mongoose.Schema<IFriend>(
  {
    senderId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      unique: true,
    },
    receiverId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      unique: true,
    },
    status: {
      type: String,
      default: 'Pending',
    },
  },
  { timestamps: true },
);

export default mongoose.model<IFriend, FriendModel>('FriendInvitation', FriendSchema);
