import express from 'express';
import { ProxyGenerator } from '@moralisweb3/express';
import config from './config';

export const apiRouter = express.Router();

const evmProxyRouter = new ProxyGenerator('evm', {
  apiKey: config.MORALIS_API_KEY,
  rateLimitOptions: {
    maxRequests: 4,
    ttl: 30,
    redisUrl: config.REDIS_URL,
  },
});

// This is not rate limited.
const solanaProxyRouter = new ProxyGenerator('solana', {
  apiKey: config.MORALIS_API_KEY,
});

apiRouter.use('/evm-api-proxy', evmProxyRouter.getRouter());
apiRouter.use('/solana-api-proxy', solanaProxyRouter.getRouter());
