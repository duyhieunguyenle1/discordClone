interface IUser {
  _id: string;
  email: string;
  username: string;
  password: string;
}

interface IUserMethods {
  comparePassword(
    enteredPassword: string,
  ): Promise<boolean>;
}

export { IUser, IUserMethods };
