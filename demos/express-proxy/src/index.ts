import Moralis from 'moralis';
import express from 'express';
import cors from 'cors';
import config from './config';
import { apiRouter } from './apiRouter';
import { errorHandler } from './middlewares/errorHandler';

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

app.listen(config.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`'Moralis Demo Express proxy' is running on port ${config.PORT}`);
});
