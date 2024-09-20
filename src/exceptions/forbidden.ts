import httpStatus from 'http-status';

import { BaseError } from './base-error';

export type ErrorDetails = { [key: string]: any };

export class ForbiddenError extends BaseError {
  constructor(message: string, errorCode = 403, errorDetails?: ErrorDetails) {
    super(httpStatus.FORBIDDEN, message, errorCode, errorDetails);
  }
}
