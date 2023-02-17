import { logger } from 'config/logger';
import morgan from 'morgan';

const responseFormat = (tokens: any, req: any, res: any) => {
  return `Got Request: ip(${tokens['remote-addr'](req)})<${
    req?.user?.email ?? ''
  }> ${req.method} ${req.path} params=${JSON.stringify(
    req.params,
  )} query=${JSON.stringify(req.query)} body=${JSON.stringify(
    req.body,
  )} ${tokens['response-time'](req, res)}ms`;
};

const successHandler = morgan(responseFormat, {
  skip: (req, res) => res.statusCode >= 400,
  stream: { write: (message) => logger.info(message.trim()) },
});

const errorHandler = morgan(responseFormat, {
  skip: (req: any, res: any) => res.statusCode < 400,
  stream: { write: (message) => logger.error(message.trim()) },
});

export { successHandler, errorHandler };
