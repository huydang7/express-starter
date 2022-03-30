import { Express, Request, Response, NextFunction } from "express";

type ResponseFunction = (
  data: any,
  message?: any,
  errorCode?: any,
  errorDetails?: any,
  stack?: any
) => void;

declare global {
  namespace Express {
    interface Response {
      formatter: ResponseFunction;
    }
  }
}

const responseEnhancer = (
  _: Request,
  res: Response,
  next: NextFunction
): void => {
  res.formatter = (
    data: any,
    message?: any,
    errorCode?: any,
    errorDetails?: any,
    stack?: any
  ) => {
    res.json({
      errorCode: errorCode || 0,
      errorDetails: errorDetails || "",
      message: message || "",
      data,
      stack,
    });
  };
  next();
};

export { responseEnhancer };
