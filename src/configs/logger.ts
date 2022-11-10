import config from './env';
import winston, { format } from 'winston';

const enumerateErrorFormat = winston.format((info) => {
  if (info instanceof Error) {
    Object.assign(info, { message: info.stack });
  }
  return info;
});

export const formatter = format.combine(
  format.timestamp(),
  format.simple(),
  winston.format.colorize(),
  format.printf((log) => `${log.timestamp} ${log.level}: ${log.message}`),
  enumerateErrorFormat(),
);

export const apiFormatter = format.combine(
  format.timestamp(),
  format.simple(),
  winston.format.colorize(),
  format.printf((log) => `${log.timestamp} [API] ${log.level}: ${log.message}`),
  enumerateErrorFormat(),
);

export const dbFormatter = format.combine(
  format.timestamp(),
  format.simple(),
  winston.format.colorize(),
  format.printf((log) => `${log.timestamp} [DB] ${log.level}: ${log.message}`),
  enumerateErrorFormat(),
);

const logger = winston.createLogger({
  level: config.env === 'development' ? 'debug' : 'info',
  format: apiFormatter,
  transports: [
    new winston.transports.Console({
      format: apiFormatter,
      handleExceptions: true,
    }),
    new winston.transports.File({
      format: apiFormatter,
      filename: 'api.log',
      dirname: 'logs',
      maxsize: 10 * 1024 * 1024, // 10MB
      handleExceptions: true,
    }),
  ],
});

const dbLogger = winston.createLogger({
  level: config.env === 'development' ? 'debug' : 'info',
  format: dbFormatter,
  transports: [
    new winston.transports.Console({
      format: dbFormatter,
      handleExceptions: true,
    }),
    new winston.transports.File({
      format: dbFormatter,
      filename: 'db.log',
      dirname: 'logs',
      maxsize: 10 * 1024 * 1024, // 10MB
      handleExceptions: true,
    }),
  ],
});

export { logger, dbLogger };
