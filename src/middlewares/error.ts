/* eslint-disable @typescript-eslint/no-unused-vars */
import config from 'config';
import { logger } from 'config/logger';
import { Response } from 'express';

const errorHandler = (err: any, _req: any, res: Response, _next: any) => {
  const { httpCode, message, errorCode, errorDetails } = err;
  logger.error(message || 'Unknown error');
  logger.error(err.stack);
  res
    .status(httpCode)
    .formatter(
      null,
      message,
      errorCode,
      errorDetails,
      config.env === 'development' && err.stack,
    );
};

export { errorHandler };
