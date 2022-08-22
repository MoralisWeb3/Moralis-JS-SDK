import express from 'express';
import { ProxyGenerator } from './api/proxyGenerator';
import config from './config';
import rateLimit, { MemoryStore } from 'express-rate-limit';

const apiLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // Limit each IP to 10 requests per `window` (here, per minute)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  store: new MemoryStore(),
});

export const apiRouter = express.Router();

const evmProxyRouter = new ProxyGenerator('evm', {
  apiKey: config.MORALIS_API_KEY,
});

const solanaProxyRouter = new ProxyGenerator('solana', {
  apiKey: config.MORALIS_API_KEY,
});

apiRouter.use('/evm-api-proxy', apiLimiter, evmProxyRouter.getRouter());
apiRouter.use('/solana-api-proxy', apiLimiter, solanaProxyRouter.getRouter());
