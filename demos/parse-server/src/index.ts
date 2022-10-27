import Moralis from 'moralis';
import express from 'express';
import cors from 'cors';
import ngrok from 'ngrok';
import { parseDashboard } from './parseDashboard';
import { parseServer } from './parseServer';
import { errorHandler } from './middlewares/errorHandler';
import config from './config';
import { apiRouter } from './apiRouter';
import { initializeStreams } from '@moralisweb3/parse-server';

const app = express();

Moralis.start({
  apiKey: config.MORALIS_API_KEY,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

initializeStreams(parseServer, app, {
  apiKey: config.MORALIS_API_KEY,
  webhookUrl: '/streams',
  streamConfig: [
    {
      tableName: 'MyStream',
      tag: 'myStream',
    },
  ],
});

app.use(`/${config.SERVER_ENDPOINT}`, parseServer.app);
app.use('/dashboard', parseDashboard);
app.use('/api', apiRouter);
app.use(errorHandler);

app.use(express.static('public'));

app.listen(config.PORT, async () => {
  const url = await ngrok.connect(config.PORT);
  // eslint-disable-next-line no-console
  console.log(`${config.APP_NAME} is running on port ${config.PORT} and ngrok url ${url}`);
});
