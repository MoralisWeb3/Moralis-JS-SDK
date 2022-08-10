import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import Moralis from 'moralis';
import {ipRateLimiterMiddleware} from './middlewares/ip-rate-limiter';
import {corsMiddleware} from './middlewares/cors';

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

export const getNFTMetadata = functions.https.onRequest(cors(limiter(
  async (request, response) => {
    functions.logger.info('Proxy called');

    const address = request.body?.data['address'] as string | undefined;
    if (!address || typeof address !== 'string') {
      throw new functions.https.HttpsError(
        'invalid-argument', 'address is required');
    }

    const metadata = await Moralis.EvmApi.token.getNFTMetadata({
      address: address,
    });

    response.send({
      data: metadata.toJSON(),
    });
  })));
