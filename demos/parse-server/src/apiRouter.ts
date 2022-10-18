import express from 'express';
import { ProxyGenerator } from './api/proxyGenerator';
import { authRouter } from './auth/authRouter';
import config from './config';
import rateLimit, { MemoryStore } from 'express-rate-limit';

const apiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 10,
  standardHeaders: true,
  store: new MemoryStore(),
});

const evmProxyRouter = new ProxyGenerator('evm', {
  apiKey: config.MORALIS_API_KEY,
});

const solanaProxyRouter = new ProxyGenerator('solana', {
  apiKey: config.MORALIS_API_KEY,
});

export const apiRouter = express.Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/evm-api-proxy', apiLimiter, evmProxyRouter.getRouter());
apiRouter.use('/solana-api-proxy', apiLimiter, solanaProxyRouter.getRouter());
