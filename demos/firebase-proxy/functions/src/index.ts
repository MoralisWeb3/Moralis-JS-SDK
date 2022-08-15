import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import Moralis from 'moralis';
import {createEvmApiProxy, createSolApiProxy} from '@moralisweb3/firebase-functions';
import {ipRateLimiterMiddleware} from './middlewares/ip-rate-limiter';

const app = admin.initializeApp(functions.config().firebase);
const firestore = admin.firestore(app);

const ipRateLimiter = ipRateLimiterMiddleware(firestore, {
  maxCalls: 2,
  periodSeconds: 10,
});

Moralis.start({
  apiKey: process.env.MORALIS_API_KEY,
});

// The below code creates 4 proxy functions.
// ~/evmApi-getBlock
// ~/evmApi-runContractFunction
// ~/evmApi-getNFTMetadata
// ~/evmApi-web3ApiVersion
export const evmApi = createEvmApiProxy([
  'getBlock',
  'runContractFunction',
  'getNFTMetadata',
  'web3ApiVersion',
], ipRateLimiter);

// The below code creates 1 proxy function.
// ~/solApi-getPortfolio
export const solApi = createSolApiProxy([
  'getPortfolio',
], ipRateLimiter);

export const getTime = functions.https.onCall(() => {
  return Date.now();
});
