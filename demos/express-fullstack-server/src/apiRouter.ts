import express from 'express';
import rateLimit, { MemoryStore } from 'express-rate-limit';
import { AuthRouter, EvmApiRouter, SolApiRouter, moralisJWT } from '@moralisweb3/express';
import config from './config';

const apiLimiter = rateLimit({
  // 1 minute
  windowMs: 60 * 1000,
  // Limit each IP to 10 requests per `window` (here, per minute)
  max: 10,
  // Return rate limit info in the `RateLimit-*` headers
  standardHeaders: true,
  store: new MemoryStore(),
});

export const apiRouter = express.Router();

const moralisSessionChecker = moralisJWT(config.TOKEN_SECRET);

apiRouter.use('/evm-api', moralisSessionChecker, apiLimiter, EvmApiRouter.Router);
apiRouter.use('/solana-api', moralisSessionChecker, apiLimiter, SolApiRouter.Router);

apiRouter.use(
  '/auth-api',
  apiLimiter,
  AuthRouter.Router({
    challenge: {
      domain: 'amazing.dapp',
      uri: 'http://127.0.0.1:7777/',
      timeout: 120,
    },
    secret: config.TOKEN_SECRET,
    cookie: {
      httpOnly: true,
    },
  }),
);
