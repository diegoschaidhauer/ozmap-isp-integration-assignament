import { connectDatabase } from './database';
import { SyncService } from './services/SyncService';
import { config } from './config';
import { logger } from './utils/logger';

async function main() {
  await connectDatabase();

  const syncService = new SyncService();

  setInterval(() => {
    logger.info('Iniciando nova sincronização...');
    syncService.synchronizeAll();
  }, config.syncIntervalMs);
}

main();
