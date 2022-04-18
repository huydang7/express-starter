import { Request, Response, NextFunction } from 'express';

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
      result: data,
      stack,
    });
  };
  next();
};

export { responseEnhancer };
