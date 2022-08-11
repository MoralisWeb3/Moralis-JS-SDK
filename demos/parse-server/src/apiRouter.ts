import express from 'express';
import evmProxyRouter from './api/evmProxy';
import { authRouter } from './auth/authRouter';

export const apiRouter = express.Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/evm-api-proxy', evmProxyRouter);
