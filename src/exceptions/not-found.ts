import { BaseError } from './base-error';
import httpStatus from 'http-status';

export type ErrorDetails = { [key: string]: any };

export class NotFoundError extends BaseError {
  constructor(
    message: string,
    errorCode: number = 404,
    errorDetails?: ErrorDetails,
  ) {
    super(httpStatus.NOT_FOUND, message, errorCode, errorDetails);
  }
}
