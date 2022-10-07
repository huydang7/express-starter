import config from '../configs/env';

import { logger, dbLogger } from '../configs/logger';

import { Sequelize } from 'sequelize';
import { initModels, initRelations } from '../models';

export let connection: Sequelize;

export const getConnection = () => {
  if (!connection) {
    initDb();
  }
  return connection;
};

export const initDb = async () => {
  try {
    logger.info('Initializing database connection...');
    connection = new Sequelize(
      config.db.name,
      config.db.username,
      config.db.password,
      {
        host: config.db.host,
        dialect: 'postgres',
        define: {
          paranoid: true,
        },
        logging: (sql) => dbLogger.info(sql),
      },
    );
    await connection.authenticate();
    initModels(connection);
    initRelations();
    await connection.sync({});
    logger.info('Database connection initialized.');

    connection.addHook('beforeCreate', (instance) => {
      instance.setDataValue('id' as any, null); // Disallow manual id
    });

    connection.addHook('beforeBulkUpdate', (instance: any) => {
      instance.fields = instance.fields.filter(
        (column: string) => column !== 'id',
      );
    });
  } catch (error: any) {
    logger.error(`Database connection failed: ${error.message}`);
  }
};
