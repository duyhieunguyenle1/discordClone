interface IUser {
  _id: string;
  email: string;
  username: string;
  password: string;
  img?: string;
  friends: string[];
}

export type { IUser };
