import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import Moralis from 'moralis';
import {ipRateLimiterMiddleware} from './middlewares/IpRateLimiter';

const app = admin.initializeApp(functions.config().firebase);
const firestore = admin.firestore(app);

const ipRateLimiter = ipRateLimiterMiddleware(firestore, {
  maxCalls: 2,
  periodSeconds: 10,
});

Moralis.start({
  apiKey: process.env.MORALIS_API_KEY,
});

// ~/getBlock

interface GetBlockData {
  chain: string;
  blockNumberOrHash: string;
}

export const getBlock = functions.https.onCall(ipRateLimiter(async (data: GetBlockData) => {
  const response = await Moralis.EvmApi.native.getBlock({
    chain: data.chain,
    blockNumberOrHash: data.blockNumberOrHash,
  });
  return response.toJSON();
}));

// ~/runContractFunction

interface RunContractFunctionData {
  chain: string;
  functionName: string;
  address: string;
  abi: unknown;
  params: {[name: string]: string};
}

export const runContractFunction = functions.https.onCall(ipRateLimiter(async (data: RunContractFunctionData) => {
  const response = await Moralis.EvmApi.native.runContractFunction({
    chain: data.chain,
    functionName: data.functionName,
    address: data.address,
    abi: data.abi,
    params: data.params,
  });
  return response.toJSON();
}));

// ~/getNFTMetadata

interface GetNFTMetadataData {
  address: string;
}

export const getNFTMetadata = functions.https.onCall(ipRateLimiter(async (data: GetNFTMetadataData) => {
  const response = await Moralis.EvmApi.token.getNFTMetadata({
    address: data.address,
  });
  return response.toJSON();
}));

// ~/getWeb3ApiVersion

export const getWeb3ApiVersion = functions.https.onCall(ipRateLimiter(async () => {
  const response = await Moralis.EvmApi.info.web3ApiVersion();
  return response.toJSON();
}));

// ~/getPortfolio

interface GetPortfolioData {
  address: string;
}

export const getPortfolio = functions.https.onCall(ipRateLimiter(async (data: GetPortfolioData) => {
  const response = await Moralis.SolApi.account.getPortfolio({
    address: data.address,
  });
  return response.toJSON();
}));

// ~/getTime

export const getTime = functions.https.onCall(ipRateLimiter(async () => {
  return Date.now();
}));
