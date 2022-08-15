import express from 'express';
import { authRouter } from './auth/authRouter';

export const apiRouter = express.Router();

apiRouter.use('/auth', authRouter);
