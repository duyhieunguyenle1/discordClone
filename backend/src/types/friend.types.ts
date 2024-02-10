import { Schema } from 'mongoose';

interface IFriend {
  _id: string;
  senderId: Schema.Types.ObjectId;
  receiverId: Schema.Types.ObjectId;
  status: 'Pending' | 'Accepted' | 'Rejected';
}

interface IFriendPopulate {
  _id: string;
  email: string;
  username: string;
  password: string;
  img?: string;
  friends: IFriendUser[];
}

interface IFriendUser {
  _id: string;
  email: string;
  username: string;
  img?: string;
}

export { IFriend, IFriendPopulate, IFriendUser };
