import { hookRouter } from './hook';
import Moralis from 'moralis';
import express from 'express';
import cors from 'cors';
import config from './config';
import { errorHandler } from './middlewares/errorHandler';
import { streamRouter } from './stream/streamRouter';
import ngrok from 'ngrok';

const app = express();

Moralis.start({
  apiKey: config.MORALIS_API_KEY,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

app.use(errorHandler);

app.use('/hooks', hookRouter);
app.use('/stream', streamRouter);

app.use(express.static('public'));

app.listen(config.PORT, async () => {
  const url = await ngrok.connect(config.PORT);
  // eslint-disable-next-line no-console
  console.log(`'Demo Moralis streams' is running on port ${config.PORT} and ngrok url ${url}`);
});
