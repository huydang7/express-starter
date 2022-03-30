import { Response } from "express";
import config from "../configs/config";

const errorHandler = (err: any, req: any, res: Response, next: any) => {
  let { httpCode, message, errorCode, errorDetails } = err;

  res
    .status(httpCode)
    .formatter(
      null,
      message,
      errorCode,
      errorDetails,
      config.env === "development" && err.stack
    );
};

export { errorHandler };
