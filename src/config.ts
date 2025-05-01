import dotenv from 'dotenv';
dotenv.config();

export const config = {
  ispApiUrl: process.env.ISP_API_URL || 'http://localhost:4000',
  ozmapApiKey: process.env.OZMAP_API_KEY || '',
  ozmapBaseUrl: process.env.OZMAP_BASE_URL || 'https://api.ozmap.com.br',
  mongoUri: process.env.MONGO_URI || 'mongodb://localhost:27017/ozmap_sync',
  syncIntervalMs: Number(process.env.SYNC_INTERVAL_MS) || 5 * 60 * 1000,
  simulateOzmap: process.env.SIMULATE_OZMAP === 'true'
};
