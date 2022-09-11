import * as dotenv from 'dotenv';
import { cleanEnv, num, str, bool } from 'envalid';

dotenv.config();

export default cleanEnv(process.env, {
  PORT: num(),

  MORALIS_API_KEY: str(),

  APP_NAME: str(),

  STREAM_SECRET: str(),

  ALLOW_INSECURE_HTTP: bool({ default: false }),
});
