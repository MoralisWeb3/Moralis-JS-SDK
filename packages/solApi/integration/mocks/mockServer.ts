import { mockGetBalanceSol } from './endpoints/getBalance';
import { MOCK_API_KEY, SOL_API_ROOT } from './config';
import { mockGetNFTSol } from './endpoints/getNFT';
import { mockGetSPLSol } from './endpoints/getSPL';
import { mockGetNFTMetadataSol } from './endpoints/getNFTMetadata';
import { mockGetPortfolioSol } from './endpoints/getPortfolio';
import { mockGetTokenPrice } from './endpoints/getTokenPrice';
import { MockServer } from '@moralisweb3/test-utils';

const handlers = [
  mockGetBalanceSol,
  mockGetNFTSol,
  mockGetSPLSol,
  mockGetNFTMetadataSol,
  mockGetPortfolioSol,
  mockGetTokenPrice,
];

export const mockServer = MockServer.create({ apiKey: MOCK_API_KEY, apiRoot: SOL_API_ROOT }, handlers).start();
