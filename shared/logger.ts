import { RequestHandler, ErrorRequestHandler } from "express";
import winston from "winston";
import expressWinston from "express-winston";
import config from "config";

const format = winston.format.combine(
  winston.format.timestamp(),
  winston.format.colorize(),
  winston.format.simple(),
);

const transports = [
  new winston.transports.Console({
    format,
  }),
];

export const logger = winston.createLogger({
  level: config.get("log.level"),
  format: winston.format.json(),
  defaultMeta: { service: config.get("service.name") },
  transports,
});

export const loggerMiddleware = (): RequestHandler =>
  expressWinston.logger({
    winstonInstance: logger,
    format,
    meta: false,
    expressFormat: true,
  });

export const errorLoggerMiddleware = (): ErrorRequestHandler =>
  expressWinston.errorLogger({
    winstonInstance: logger,
    format,
  });
