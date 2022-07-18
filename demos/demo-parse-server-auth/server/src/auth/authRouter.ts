import express from 'express';
import authController from './authController';

export const authRouter = express.Router();

authRouter.route('/request-message').post(authController.request);
authRouter.route('/sign-message').post(authController.verify);
