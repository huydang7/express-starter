import app from './app';
import configs from 'configs';
import { logger } from 'configs/logger';
import { initDb } from 'database/connection';

initDb();
app.listen(configs.port, () => {
  logger.info(`Server running on port ${configs.port}`);
});
