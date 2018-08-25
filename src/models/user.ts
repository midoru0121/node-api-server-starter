import Sequelize from 'sequelize';

import { sequelizeInstance } from 'config/database';

export const UserTable = {
  name: 'users',
  schema: {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: {},
    },
    password: { type: Sequelize.STRING, allowNull: false },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  },
};

export const User = sequelizeInstance.define(UserTable.name, UserTable.schema);
