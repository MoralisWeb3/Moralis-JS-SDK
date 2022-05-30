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
import { mockGetNFTs } from './evmApi/getNFTs';
import { mockGetNFTTransfers } from './evmApi/getNFTTransfers';
import { mockWeb3ApiVersion } from './evmApi/web3ApiVersion';
import { mockGetNFTTrades } from './evmApi/getNFTTrades';
import { mockGetNFTTransfersByBlock } from './evmApi/getNFTTransfersByBlock';
import { mockGetContractNFTTransfers } from './evmApi/getContractNFTTransfers';
import { mockGetNFTLowestPrice } from './evmApi/getNFTLowestPrice';
import { mockGetAllTokenIds } from './evmApi/getAllTokenIds';

const handlers = [
  mockResolveDomain,
  mockResolveAddress,
  mockGetNativeBalance,
  mockGetTokenPrice,
  mockGetPairReserves,
  mockGetLogsByAddress,
  mockGetTokenTransfer,
  mockGetTransactions,
  mockGetNFTTransfers,
  mockGetNFTsForContract,
  mockGetNFTs,
  mockWeb3ApiVersion,
  mockGetNFTTrades,
  mockGetNFTTransfersByBlock,
  mockGetContractNFTTransfers,
  mockGetNFTLowestPrice,
  mockGetAllTokenIds,
];

export const mockServer = setupServer(...handlers);
