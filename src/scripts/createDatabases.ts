import { DB_CONFIG, getDBName } from 'config/database';

// tslint:disable-next-line:no-var-requires
const Sequelize = require('sequelize');

const sequelizeInstance = new Sequelize(
  null,
  process.env.DB_USER,
  process.env.DB_PASS,
  { ...DB_CONFIG },
);

(() => {
  const db = getDBName();

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
})();
