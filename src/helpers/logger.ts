import winston = require('winston');

import { isProduction } from 'helpers/env';

/*
For more details:

https://github.com/winstonjs/winston
*/

const buildProdLogger = () =>
  winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' }),
    ],
  });

const buildDevLogger = () =>
  winston.createLogger({
    level: 'debug',
    format: winston.format.json(),
    transports: [
      new winston.transports.Console({
        format: winston.format.simple(),
      }),
    ],
  });

export const logger = isProduction() ? buildProdLogger() : buildDevLogger();

export const errorLog = (logMsg: any) => logger.error(logMsg);
export const infoLog = (logMsg: any) => logger.info(logMsg);
