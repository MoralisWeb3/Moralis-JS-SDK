import express from 'express';
import { verify, request, login } from './authController';

export const authRouter = express.Router();

authRouter.route('/request-message').post(request);
authRouter.route('/sign-message').post(verify);
authRouter.route('/login').post(login);
