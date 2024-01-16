import mongoose, { Schema, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

import { IUser, IUserMethods } from '../types/user.types';

type UserModel = Model<IUser, {}, IUserMethods>;

const UserSchema: Schema = new mongoose.Schema<
  IUser,
  UserModel,
  IUserMethods
>(
  {
    email: {
      type: String,
      unique: true,
      required: [true, 'Email is required'],
    },
    username: {
      type: String,
      required: [true, 'Name is required'],
      maxlength: [
        18,
        'Username cannot exceed 18 characters',
      ],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
      minlength: [
        6,
        'Password has to be at least 6 characters',
      ],
    },
  },
  { timestamps: true },
);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 12);
});

UserSchema.methods.comparePassword = async function (
  enteredPassword: string,
) {
  return await bcrypt.compare(
    enteredPassword,
    this.password,
  );
};

export default mongoose.model<IUser, UserModel>(
  'User',
  UserSchema,
);
