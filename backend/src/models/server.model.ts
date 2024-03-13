import mongoose, { Schema, Model } from 'mongoose';
import { IServer } from '../types/server.types';

type ServerModel = Model<IServer, {}>;

const ServerSchema: Schema = new mongoose.Schema<IServer, ServerModel>(
  {
    imgUrl: {
      type: String,
    },
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [18, 'Server name cannot exceed 18 characters'],
    },
    inviteCode: {
      type: String,
      required: [true, 'Invite code is required'],
      unique: true,
    },
    channels: [{ type: Schema.Types.ObjectId, ref: 'Channel' }],
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true },
);

export default mongoose.model<IServer, ServerModel>('Server', ServerSchema);
