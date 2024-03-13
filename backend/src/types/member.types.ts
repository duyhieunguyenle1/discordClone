import { ObjectId } from 'mongoose';

enum ChannelRoleTypes {
  ADMIN = 'Admin',
  USER = 'User',
  BANNER = 'Banner',
  AUTHORIZED_USER = 'Authorized_user',
}

interface IMember {
  _id: string;
  user_id: ObjectId;
  server: ObjectId;
  name_in_server: string;
  channel: {
    id: ObjectId;
    roles: ChannelRoleTypes;
  };
}

export { IMember, ChannelRoleTypes };
