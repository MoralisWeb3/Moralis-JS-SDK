import Moralis from 'moralis';
import express from 'express';
import cors from 'cors';
import { parseDashboard } from './parseDashboard';
import { parseServer } from './parseServer';
import { errorHandler } from './middlewares/errorHandler';
import config from './config';
import { apiRouter } from './apiRouter';

const app = express();

Moralis.start({
  apiKey: config.MORALIS_API_KEY,
  // TODO: remove this requirement form Moralis
  serverUrl: config.SERVER_URL,
  appId: config.APPLICATION_ID,
  logLevel: 'verbose',
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

app.use(`/${config.SERVER_ENDPOINT}`, parseServer);
app.use('/dashboard', parseDashboard);
app.use('/api', apiRouter);
app.use(errorHandler);

app.listen(config.PORT, function () {
  console.log(`parse-server running on port ${config.PORT}`);
});
