import { InternalAxiosRequestConfig } from 'axios';

interface UserType {
  email: string;
  username: string;
  user_id: string;
}

export interface ExtendedRequest extends InternalAxiosRequestConfig {
  user?: UserType;
}
