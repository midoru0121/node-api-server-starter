import { DB_CONFIG } from 'config/database';

// tslint:disable-next-line:no-var-requires
const Sequelize = require('sequelize');

const DATABASES = [
  process.env.DB_NAME_DEV,
  process.env.DB_NAME_TEST,
  process.env.DB_NAME_PROD,
];

const sequelizeInstance = new Sequelize(
  null,
  process.env.DB_USER,
  process.env.DB_PASS,
  { ...DB_CONFIG },
);

(() => {
  DATABASES.forEach(db => {
    sequelizeInstance
      .query(`CREATE DATABASE IF NOT EXISTS ${db};`)
      .then((result: any) => {
        console.log(`DATABASE ${db} CREATED! `);
        sequelizeInstance.close();
      })
      .catch((error: any) => {
        console.error(error);
        sequelizeInstance.close();
      });
  });
})();
