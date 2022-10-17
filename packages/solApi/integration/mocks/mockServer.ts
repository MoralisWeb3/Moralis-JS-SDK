import { setupServer } from 'msw/node';

import { mockGetNFT } from './endpoints/getNFT';
import { mockGetBalanceSol } from './endpoints/getBalance';
import { mockGetNFTMetadata } from './endpoints/getNFTMetadata';
import { mockGetSPL } from './endpoints/getSPL';
import { mockGetPortfolio } from './endpoints/getPortfolio';

const handlers = [mockGetNFT, mockGetBalanceSol, mockGetNFTMetadata, mockGetSPL, mockGetPortfolio];

export const mockServer = setupServer(...handlers);
