import { setupServer } from 'msw/node';
import { mockResolveDomain } from './evmApi/resolveDomain';
import { mockResolveAddress } from './evmApi/resolveAddress';
import { mockGetLogsByAddress } from './evmApi/getLogsByAddress';
import { mockGetPairReserves } from './evmApi/getPairReserves';
import { mockGetNativeBalance } from './evmApi/getNativeBalance';
import { mockGetNFTsForContract } from './evmApi/getNFTsForContract';
import { mockGetTokenTransfer } from './evmApi/getTokenTransfers';
import { mockGetTransactions } from './evmApi/getTransactions';
import { mockGetTokenPrice } from './evmApi/getTokenPrice';
import { mockGetNFTTrades } from './evmApi/getNFTTrades';
import { mockGetContractNFTTransfers } from './evmApi/getContractNFTTransfers';
import { mockGetNFTLowestPrice } from './evmApi/getNFTLowestPrice';

const handlers = [
  mockResolveDomain,
  mockResolveAddress,
  mockGetNativeBalance,
  mockGetTokenPrice,
  mockGetPairReserves,
  mockGetLogsByAddress,
  mockGetTokenTransfer,
  mockGetTransactions,
  mockGetNFTsForContract,
  mockGetNFTTrades,
  mockGetContractNFTTransfers,
  mockGetNFTLowestPrice,
];

export const mockServer = setupServer(...handlers);
