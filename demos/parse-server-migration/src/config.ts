import * as dotenv from 'dotenv';
import { cleanEnv, num, str, bool } from 'envalid';

dotenv.config();

export default cleanEnv(process.env, {
  PORT: num(),

  MORALIS_API_KEY: str(),

  DATABASE_URI: str(),

  CLOUD_PATH: str(),

  MASTER_KEY: str(),
  APPLICATION_ID: str(),
  SERVER_URL: str(),

  ALLOW_INSECURE_HTTP: bool({ default: false }),

  REDIS_CONNECTION_STRING: str(),
  RATE_LIMIT_TTL: num({ default: 30 }),
  RATE_LIMIT_AUTHENTICATED: num({ default: 50 }),
  RATE_LIMIT_ANONYMOUS: num({ default: 60 }),
});