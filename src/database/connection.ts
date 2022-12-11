import config from 'configs/env';
import { dbLogger, logger } from 'configs/logger';
import { initModels, initRelations } from 'models/index';
import { Sequelize } from 'sequelize';

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
  } catch (error: any) {
    logger.error(`Database connection failed: ${error.message}`);
  }
};
