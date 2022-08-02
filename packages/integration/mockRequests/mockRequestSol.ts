import { setupServer } from 'msw/node';

import { mockGetNFT } from './solApi/getNFT';
import { mockGetBalanceSol } from './solApi/getBalance';
import { mockGetNFTMetadata } from './solApi/getNFTMetadata';
import { mockGetSPL } from './solApi/getSPL';

const handlers = [mockGetNFT, mockGetBalanceSol, mockGetNFTMetadata, mockGetSPL];

export const mockServer = setupServer(...handlers);
