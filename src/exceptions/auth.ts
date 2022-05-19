import httpStatus from 'http-status';
import { BaseError } from './api-error';

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
