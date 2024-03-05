interface ISender {
  _id: string;
  username: string;
  email: string;
  img?: string;
}

interface IFriendInvitation {
  _id: string;
  senderId: ISender;
  receiverId: string;
  status: 'Pending' | 'Accepted' | 'Rejected';
}

interface IFriend {
  id: string;
  username: string;
  img?: string;
}

interface IOnlineUser {
  socketId: string;
  userId: string;
}

export type { IFriendInvitation, IFriend, IOnlineUser };
