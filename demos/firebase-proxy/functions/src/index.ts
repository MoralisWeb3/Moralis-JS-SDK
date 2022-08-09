import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import Moralis from 'moralis';
import {ipRateLimiter} from './https/ip-rate-limiter';

const app = admin.initializeApp(functions.config().firebase);
const firestore = admin.firestore(app);

const limiter = ipRateLimiter(firestore, {
  maxCalls: 2,
  periodSeconds: 5,
});

Moralis.start({
  apiKey: process.env.MORALIS_API_KEY,
});

export const version = functions.https.onRequest(limiter(
  async (_, response) => {
    functions.logger.info('function called');

    const version = await Moralis.EvmApi.info.web3ApiVersion();

    response.send(version.raw);
  }));
