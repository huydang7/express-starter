import httpStatus from 'http-status';
import { BaseError } from './api-error';

export type ErrorDetails = { [key: string]: any };

export class BadRequest extends BaseError {
  constructor(message: string, errorCode: number, errorDetails?: ErrorDetails) {
    super(httpStatus.BAD_REQUEST, message, errorCode, errorDetails);
  }
}
