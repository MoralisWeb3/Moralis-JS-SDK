import express from 'express';
import { create, update, getAll, del } from './streamController';

export const streamRouter = express.Router();

streamRouter.route('/create').post(create);
streamRouter.route('/update/:id').patch(update);
streamRouter.route('/getAll').get(getAll);
streamRouter.route('/delete/:id').delete(del);
