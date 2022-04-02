import { Response } from 'express';
import config from '../configs/config';
import { logger } from '../configs/logger';

const errorHandler = (err: any, req: any, res: Response, next: any) => {
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
