/* eslint-disable @typescript-eslint/no-unused-vars */
import * as express from 'express';
import { IUser } from '@interfaces/user';

declare global {
  namespace Express {
    interface Response {
      formatter: ResponseFunction;
    }
    interface User extends IUser {}
  }
}
