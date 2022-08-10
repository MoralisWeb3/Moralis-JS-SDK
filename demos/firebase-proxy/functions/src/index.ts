import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import Moralis from 'moralis';
import {ipRateLimiterMiddleware} from './middlewares/ip-rate-limiter';

const app = admin.initializeApp(functions.config().firebase);
const firestore = admin.firestore(app);

const limiter = ipRateLimiterMiddleware(firestore, {
  maxCalls: 2,
  periodSeconds: 10,
});

Moralis.start({
  apiKey: process.env.MORALIS_API_KEY,
});

export const getNFTMetadata = functions.https.onCall(
  limiter(async (data: {address: string}) => {
    functions.logger.info('Proxy called');

    if (!data.address || typeof data.address !== 'string') {
      throw new functions.https.HttpsError(
        'invalid-argument', 'address is required');
    }

    const metadata = await Moralis.EvmApi.token.getNFTMetadata({
      address: data.address,
    });
    return metadata.raw;
  }));
