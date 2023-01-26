import path from 'node:path';
import { Sequelize } from 'sequelize';
import { NODE_ENV, DB_FILE_NAME } from '../config';

function createTestingConnection() {
  return new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false,
  });
}

function createProdConnection() {
  return new Sequelize({
    dialect: 'sqlite',
    storage: path.resolve(__dirname, '..', '..', DB_FILE_NAME),
  });
}

export const sequelizeConnection =
  NODE_ENV === 'test' ? createTestingConnection() : createProdConnection();
