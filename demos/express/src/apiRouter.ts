import express from 'express';
import rateLimit, { MemoryStore } from 'express-rate-limit';
import { EvmApiRouter, SolApiRouter } from '@moralisweb3/express';

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

apiRouter.use('/evm', apiLimiter, EvmApiRouter.Router);
apiRouter.use('/solana', apiLimiter, SolApiRouter.Router);
