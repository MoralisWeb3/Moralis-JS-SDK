import { setupServer } from 'msw/node';
import { mockGetNFT } from './solApi/getNFT';
import { mockGetBalanceSol } from './solApi/getBalance';

const handlers = [mockGetNFT, mockGetBalanceSol];

export const mockServer = setupServer(...handlers);
