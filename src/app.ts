import { connectDatabase } from './database';

import { config } from './config';
import { logger } from './utils/logger';

async function main() {
  await connectDatabase();



  setInterval(() => {
    logger.info('Iniciando nova sincronização...');
    
  }, config.syncIntervalMs);
}

main();