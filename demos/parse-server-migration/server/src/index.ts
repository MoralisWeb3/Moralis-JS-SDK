import Moralis from 'moralis';
import express from 'express';
import cors from 'cors';
import { parseServer } from './parseServer';
import config from './config';
import http from 'http';

export const app = express();

Moralis.start({
  apiKey: config.MORALIS_API_KEY,
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());

app.use(`/server`, parseServer);

const httpServer = http.createServer(app);
httpServer.listen(config.PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Moralis Server is running on port ${config.PORT}.`);
});
// This will enable the Live Query real-time server
parseServer.createLiveQueryServer(httpServer);
