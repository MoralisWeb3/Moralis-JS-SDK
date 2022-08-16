import * as dotenv from 'dotenv';
import { cleanEnv, num, str } from 'envalid';

dotenv.config();

export default cleanEnv(process.env, {
  PORT: num(),

  SUPABASE_PUBLIC_ANON_KEY: str(),

  SUPABASE_URL: str(),

  APP_NAME: str(),

  MORALIS_API_KEY: str(),

  SUPABASE_JWT: str(),

  SUPABASE_SERVICE_KEY: str(),
});
