import * as dotenv from 'dotenv';
import { cleanEnv, num, str } from 'envalid';

dotenv.config();

export default cleanEnv(process.env, {
  PORT: num(),

  MORALIS_API_KEY: str(),
});
