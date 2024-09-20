import httpStatus from 'http-status';

import { BaseError } from './base-error';

export type ErrorDetails = { [key: string]: any };

export class AuthError extends BaseError {
  constructor(message: string, errorCode = 401, errorDetails?: ErrorDetails) {
    super(httpStatus.UNAUTHORIZED, message, errorCode, errorDetails);
  }
}
