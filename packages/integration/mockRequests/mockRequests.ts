import { setupServer } from 'msw/node';
import { mockResolveDomain } from './evmApi/resolveDomain';
import { mockResolveAddress } from './evmApi/resolveAddress';
import { mockGetLogsByAddress } from './evmApi/getLogsByAddress';
import { mockGetPairAddress } from './evmApi/getPairAddress';
import { mockGetNativeBalance } from './evmApi/getNativeBalance';
import { mockGetNFTsForContract } from './evmApi/getNFTsForContract';
import { mockGetTokenTransfer } from './evmApi/getTokenTransfers';
import { mockGetTransactions } from './evmApi/getTransactions';
import { mockGetTokenPrice } from './evmApi/getTokenPrice';

const handlers = [
  mockResolveDomain,
  mockResolveAddress,
  mockGetNativeBalance,
  mockGetTokenPrice,
  mockGetPairAddress,
  mockGetLogsByAddress,
  mockGetTokenTransfer,
  mockGetTransactions,
  mockGetNFTsForContract,
];

export const mockServer = setupServer(...handlers);
