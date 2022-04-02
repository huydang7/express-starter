import { Express, Request, Response, NextFunction } from 'express';
import { IUser } from '../models';

type ResponseFunction = (
  data: any,
  message?: any,
  errorCode?: any,
  errorDetails?: any,
  stack?: any,
) => void;

const responseEnhancer = (
  _: Request,
  res: Response,
  next: NextFunction,
): void => {
  res.formatter = (
    data: any,
    message?: any,
    errorCode?: any,
    errorDetails?: any,
    stack?: any,
  ) => {
    const statusCode = res.statusCode || 500;
    res.status(statusCode).json({
      errorCode: errorCode || 0,
      errorDetails: errorDetails || '',
      message: message || '',
      data,
      stack,
    });
  };
  next();
};

export { responseEnhancer };
