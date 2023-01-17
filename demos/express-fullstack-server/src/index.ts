import Moralis from 'moralis';
import express from 'express';
import cors from 'cors';
import config from './config';
import { apiRouter } from './apiRouter';
import { errorHandler } from './middlewares/errorHandler';
import cookieParser from 'cookie-parser';

const app = express();

Moralis.start({
  apiKey: config.MORALIS_API_KEY,
});

app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Replace it before go production!
const demoExpressClientUrls = ['http://172.17.144.1:7777', 'http://192.168.1.4:7777', 'http://127.0.0.1:7777'];

app.use(
  cors({
    origin: demoExpressClientUrls,
    credentials: true,
  }),
);

app.use('/api', apiRouter);
app.use(errorHandler);

app.use(express.static('public'));

app.listen(config.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`'Moralis Demo Express Server' is running on port ${config.PORT}`);
});
