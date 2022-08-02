import { setupServer } from 'msw/node';

import { mockGetNFT } from './solApi/getNFT';
import { mockGetBalanceSol } from './solApi/getBalance';
import { mockGetNFTMetadata } from './solApi/getNFTMetadata';
import { mockGetSPL } from './solApi/getSPL';
import { mockGetPortfolio } from './solApi/getPortfolio';

const handlers = [mockGetNFT, mockGetBalanceSol, mockGetNFTMetadata, mockGetSPL, mockGetPortfolio];

export const mockServer = setupServer(...handlers);
