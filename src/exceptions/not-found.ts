import httpStatus from 'http-status';
import { BaseError } from './api-error';

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
