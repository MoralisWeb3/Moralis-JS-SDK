import express from 'express';
import { ProxyGenerator } from './api/proxyGenerator';
import config from './config';

export const apiRouter = express.Router();

const evmProxyRouter = new ProxyGenerator('evm', {
  apiKey: config.MORALIS_API_KEY,
});

const solanaProxyRouter = new ProxyGenerator('solana', {
  apiKey: config.MORALIS_API_KEY,
});

apiRouter.use('/evm-api-proxy', evmProxyRouter.getRouter());
apiRouter.use('/solana-api-proxy', solanaProxyRouter.getRouter());
