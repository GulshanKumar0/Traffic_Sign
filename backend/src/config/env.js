import dotenv from 'dotenv';

dotenv.config();

export const env = {
  port: Number(process.env.PORT || 5000),
  jwtSecret: process.env.JWT_SECRET || 'change-me',
  aiProviderApiKey: process.env.AI_PROVIDER_API_KEY || '',
  modeDefault: process.env.MODE_DEFAULT || 'exam'
};
