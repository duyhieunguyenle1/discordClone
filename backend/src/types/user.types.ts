import { ObjectId } from 'mongoose';

interface IUser {
  _id: string;
  email: string;
  username: string;
  password: string;
  img?: string;
  friends: ObjectId[];
}

interface IUserMethods {
  comparePassword(enteredPassword: string): Promise<boolean>;
}

export { IUser, IUserMethods };
