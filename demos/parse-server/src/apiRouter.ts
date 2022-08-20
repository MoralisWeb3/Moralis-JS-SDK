import express from 'express';
import { ProxyGenerator } from './api/proxyGenerator';
import { authRouter } from './auth/authRouter';
import config from './config';

export const apiRouter = express.Router();

apiRouter.use('/auth', authRouter);

const evmProxyRouter = new ProxyGenerator('evm', {
  apiKey: config.MORALIS_API_KEY,
  rateLimitOptions: {
    redisUrl: config.REDIS_URL,
    maxRequests: 10,
    ttl: 60,
  }
});

const solanaProxyRouter = new ProxyGenerator('solana', {
  apiKey: config.MORALIS_API_KEY,
});

apiRouter.use('/evm-api-proxy', evmProxyRouter.getRouter());
apiRouter.use('/solana-api-proxy', solanaProxyRouter.getRouter());
