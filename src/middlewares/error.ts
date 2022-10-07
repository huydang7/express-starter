/* eslint-disable @typescript-eslint/no-unused-vars */
import { Response } from 'express';
import config from '../configs/env';
import { logger } from '../configs/logger';

const errorHandler = (err: any, _req: any, res: Response, _next: any) => {
  const { httpCode, message, errorCode, errorDetails } = err;
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
