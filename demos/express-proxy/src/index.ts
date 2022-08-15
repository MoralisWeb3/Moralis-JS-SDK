import Moralis from 'moralis';
import express from 'express';
import cors from 'cors';
import { errorHandler } from '@moralisweb3/express';
import config from './config';
import { apiRouter } from './apiRouter';

const app = express();

Moralis.start({
  apiKey: config.MORALIS_API_KEY,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

app.use('/api', apiRouter);
app.use(errorHandler);

app.use(express.static('public'));

app.listen(config.PORT, function () {
  // eslint-disable-next-line no-console
  console.log(`${config.APP_NAME} is running on port ${config.PORT}`);
});
