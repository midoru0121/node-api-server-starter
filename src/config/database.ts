import Sequelize = require('sequelize');
const Op = Sequelize.Op;

import { isProduction, isTest } from 'helpers/env';

export const DB_CONFIG = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 1,
    acquire: 30000,
    idle: 30000,
    evict: 10000,
  },
  retry: {
    max: 0,
  },
  operatorsAliases: Op,
  timezone: process.env.TZ,
};

export const getDBName = () => {
  if (isProduction()) {
    return process.env.DB_NAME_PROD;
  }
  if (isTest()) {
    return process.env.DB_NAME_TEST;
  }

  return process.env.DB_NAME_DEV;
};

export const sequelizeInstance = new Sequelize(
  getDBName() as string,
  process.env.DB_USER as string,
  process.env.DB_PASS as string,
  { ...DB_CONFIG } as any,
);
