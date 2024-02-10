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
  _id: string;
  isOnline: boolean;
  username: string;
  img?: string;
}

export type { IFriendInvitation, IFriend };
