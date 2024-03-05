import { ObjectId } from 'mongoose';

interface IUser {
  _id: string;
  email: string;
  username: string;
  password: string;
  img?: string;
  friends: ObjectId[];
  verified: boolean;
}

interface IUserMethods {
  comparePassword(enteredPassword: string): Promise<boolean>;
}

export { IUser, IUserMethods };
