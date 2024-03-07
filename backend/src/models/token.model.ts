import mongoose, { Schema, Model } from 'mongoose';

import { IToken } from '../types/token.types';

type TokenModel = Model<IToken, {}>;

const TokenSchema: Schema = new mongoose.Schema<IToken, TokenModel>({
  email: {
    type: String,
    unique: true,
    required: [true, 'Email is required'],
    trim: true,
  },
  token: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: new Date(Date.now()),
    expires: 60 * 1, // The document will be automatically deleted after 1 minutes of its creation time
  },
});

export default mongoose.model<IToken, TokenModel>('Token', TokenSchema);
