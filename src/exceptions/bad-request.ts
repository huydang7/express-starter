import { BaseError } from './base-error';
import httpStatus from 'http-status';

export type ErrorDetails = { [key: string]: any };

export class BadRequest extends BaseError {
  constructor(message: string, errorCode: number, errorDetails?: ErrorDetails) {
    super(httpStatus.BAD_REQUEST, message, errorCode, errorDetails);
  }
}
