import * as dotenv from 'dotenv';

dotenv.config();
import { cleanEnv, num, str, bool } from 'envalid';

export default cleanEnv(process.env, {
  PORT: num(),

  MORALIS_API_KEY: str(),

  DATABASE_URI: str(),

  CLOUD_PATH: str(),
  APP_NAME: str(),

  SERVER_ENDPOINT: str(),
  MASTER_KEY: str(),
  APPLICATION_ID: str(),
  SERVER_URL: str(),

  ALLOW_INSECURE_HTTP: bool({ default: false }),
});
