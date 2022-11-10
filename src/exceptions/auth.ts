import { BaseError } from './base-error';
import httpStatus from 'http-status';

export type ErrorDetails = { [key: string]: any };

export class AuthError extends BaseError {
  constructor(
    message: string,
    errorCode: number = 401,
    errorDetails?: ErrorDetails,
  ) {
    super(httpStatus.UNAUTHORIZED, message, errorCode, errorDetails);
  }
}
