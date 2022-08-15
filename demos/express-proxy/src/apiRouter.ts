import express from 'express';
import evmProxyRouter from './api/evmProxy';
import solanaProxyRouter from './api/solanaProxy';

export const apiRouter = express.Router();

apiRouter.use('/evm-api-proxy', evmProxyRouter);
apiRouter.use('/solana-api-proxy', solanaProxyRouter);
