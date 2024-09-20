/* eslint-disable @typescript-eslint/no-unused-vars */
import { IJWTUser } from '@/interfaces/user';

declare global {
  namespace Express {
    interface Response {
      formatter: ResponseFunction;
    }
    interface Request {
      user?: IJWTUser;
    }

    type User = IJWTUser;
  }
}
