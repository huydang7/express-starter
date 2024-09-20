import config from '@/config';
import { logger } from '@/config/logger';
import { initDb } from '@/database/connection';

import app from './app';

initDb();
app.listen(config.port, () => {
  logger.info(`Server running on port ${config.port}`);
});
