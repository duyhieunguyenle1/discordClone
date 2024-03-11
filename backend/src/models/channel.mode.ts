import mongoose, { Schema, Model } from 'mongoose';

import { ChannelType, IChannel } from '../types/channel.types';

type ChannelModel = Model<IChannel, {}>;

const ChannelSchema: Schema = new mongoose.Schema<IChannel, ChannelModel>(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      trim: true,
      maxlength: [18, 'Channel name cannot exceed 18 characters'],
    },
    type: {
      type: String,
      enum: ChannelType,
      default: ChannelType.TEXT,
    },
    server: { type: Schema.Types.ObjectId, ref: 'Server' },
  },
  { timestamps: true },
);

export default mongoose.model<IChannel, ChannelModel>('Channel', ChannelSchema);
