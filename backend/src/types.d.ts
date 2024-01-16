import { PayloadType } from './utils/jwt';

declare global {
  namespace Express {
    export type Request = {
      user: PayloadType;
    };
  }
}
