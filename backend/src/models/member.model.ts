import mongoose, { Schema, Model } from 'mongoose';

import { ChannelRoleTypes, IMember } from '../types/member.types';

type MemberModel = Model<IMember, {}>;

const ChannelSchema: Schema = new Schema({
  id: { type: Schema.Types.ObjectId, ref: 'Channel' },
  roles: { type: String, enum: ChannelRoleTypes, default: ChannelRoleTypes.USER },
});

const MemberSchema: Schema = new Schema<IMember, MemberModel>(
  {
    name_in_server: {
      type: String,
      trim: true,
      maxlength: [18, 'Channel name cannot exceed 18 characters'],
    },
    channel: {
      type: ChannelSchema,
    },
    user_id: { type: Schema.Types.ObjectId, ref: 'User' },
    server: { type: Schema.Types.ObjectId, ref: 'Server' },
  },
  { timestamps: true },
);

export default mongoose.model<IMember, MemberModel>('Member', MemberSchema);
