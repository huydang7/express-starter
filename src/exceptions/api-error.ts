export type ErrorDetails = { [key: string]: any };

export class BaseError extends Error {
  httpCode: number;
  errorCode?: number;
  errorDetails?: ErrorDetails;

  constructor(
    httpCode: number,
    message: string,
    errorCode?: number,
    errorDetails?: ErrorDetails,
  ) {
    super(message);
    this.httpCode = httpCode;
    this.errorCode = errorCode;
    this.errorDetails = errorDetails || {};
  }
}
