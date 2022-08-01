import { setupServer } from 'msw/node';

import { mockGetNFT } from './solApi/getNFT';
import { mockGetBalanceSol } from './solApi/getBalance';
import { mockGetNFTMetadata } from './solApi/getNFTMetadata';

const handlers = [mockGetNFT, mockGetBalanceSol, mockGetNFTMetadata];

export const mockServer = setupServer(...handlers);
