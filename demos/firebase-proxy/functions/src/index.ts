import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import Moralis from 'moralis';
import {corsMiddleware} from './middlewares/cors';
import {ipRateLimiterMiddleware} from './middlewares/ip-rate-limiter';

const app = admin.initializeApp(functions.config().firebase);
const firestore = admin.firestore(app);

const cors = corsMiddleware();
const limiter = ipRateLimiterMiddleware(firestore, {
  maxCalls: 2,
  periodSeconds: 5,
});

Moralis.start({
  apiKey: process.env.MORALIS_API_KEY,
});

export const version = functions.https.onRequest(cors(limiter(
  async (_, response) => {
    functions.logger.info('proxy called');

    const version = await Moralis.EvmApi.info.web3ApiVersion();

    response.send({
      data: version.toJSON(),
    });
  })));
