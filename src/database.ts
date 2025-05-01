import mongoose from 'mongoose';
import { config } from './config';
import { logger } from './utils/logger';

export async function connectDatabase() {
  try {
    await mongoose.connect(config.mongoUri);
    logger.info('MongoDB conectado com sucesso!!!');
  } catch (error) {
    logger.error(`Erro ao conectar no MongoDB: ${error}`);
  }
}
 