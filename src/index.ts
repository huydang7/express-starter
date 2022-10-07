import app from './app';
import config from './configs/env';
import { logger } from './configs/logger';
import { initDb } from './database/connection';

initDb();
app.listen(config.port, () => {
  logger.info(`Server running on port ${config.port}`);
});
