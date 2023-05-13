import * as dotenv from 'dotenv';

dotenv.config();

export const config = Object.freeze({
  port: process.env.PORT,
  environment: process.env.NODE_ENV,
  clientOrigin: process.env.CLIENT_ORIGIN,
  mongoUri: process.env.MONGO_URI,
});
