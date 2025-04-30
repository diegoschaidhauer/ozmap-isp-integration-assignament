import dotenv from 'dotenv';
dotenv.config();

export const config = {
  ispApiUrl: process.env.ISP_API_URL || 'http://localhost:4000',
  ozmapApiKey: process.env.OZMAP_API_KEY || '',
};
