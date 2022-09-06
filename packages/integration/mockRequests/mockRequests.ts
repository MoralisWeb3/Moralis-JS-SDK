import { setupServer } from 'msw/node';
import { mockEndpointWeights } from './evmApi/endpointWeights';
import { mockGetBlock } from './evmApi/getBlock';
import { mockGetContractEvents } from './evmApi/getContractEvents';
import { mockGetContractNFTs } from './evmApi/getContractNFTs';
import { mockGetDateToBlock } from './evmApi/getDateToBlock';
import { mockGetLogsByAddress } from './evmApi/getLogsByAddress';
import { mockGetNativeBalance } from './evmApi/getNativeBalance';
import { mockGetNFTContractMetadata } from './evmApi/getNFTContractMetadata';
import { mockGetNFTContractTransfers } from './evmApi/getNFTContractTransfers';
import { mockGetNFTLowestPrice } from './evmApi/getNFTLowestPrice';
import { mockGetNFTMetadata } from './evmApi/getNFTMetadata';
import { mockGetNFTOwners } from './evmApi/getNFTOwners';
import { mockGetNFTTokenIdOwners } from './evmApi/getNFTTokenIdOwners';
import { mockGetNFTTrades } from './evmApi/getNFTTrades';
import { mockGetNFTTransfers } from './evmApi/getNFTTransfers';
import { mockGetNFTTransfersByBlock } from './evmApi/getNFTTransfersByBlock';
import { mockGetNFTTransfersFromToBlock } from './evmApi/getNFTTransfersFromToBlock';
import { mockGetPairAddress } from './evmApi/getPairAddress';
import { mockGetPairReserves } from './evmApi/getPairReserves';
import { mockGetTokenAllowance } from './evmApi/getTokenAllowance';
import { mockGetTokenMetadata } from './evmApi/getTokenMetadata';
import { mockGetTokenMetadataBySymbol } from './evmApi/getTokenMetadataBySymbol';
import { mockGetTokenPrice } from './evmApi/getTokenPrice';
import { mockGetTokenTransfers } from './evmApi/getTokenTransfers';
import { mockGetTransaction } from './evmApi/getTransaction';
import { mockGetWalletNFTCollections } from './evmApi/getWalletNFTCollections';
import { mockGetWalletNFTs } from './evmApi/getWalletNFTs';
import { mockGetWalletNFTTransfers } from './evmApi/getWalletNFTTransfers';
import { mockGetWalletTokenTransfers } from './evmApi/getWalletTokenTransfers';
import { mockGetWalletTransactions } from './evmApi/getWalletTransactions';
import { mockResolveAddress } from './evmApi/resolveAddress';
import { mockResolveDomain } from './evmApi/resolveDomain';
import { mockRunContractFunction } from './evmApi/runContractFunction';
import { mockSearchNFTs } from './evmApi/searchNFTs';
import { mockSyncNFTContract } from './evmApi/syncNFTContract';
import { mockUploadFolder } from './evmApi/uploadFolder';
import { mockWeb3ApiVersion } from './evmApi/web3ApiVersion';

const handlers = [
  mockGetNFTTransfersFromToBlock,
  mockSearchNFTs,
  mockEndpointWeights,
  mockGetBlock,
  mockGetContractEvents,
  mockGetContractNFTs,
  mockGetDateToBlock,
  mockGetLogsByAddress,
  mockGetNativeBalance,
  mockGetNFTContractMetadata,
  mockGetNFTContractTransfers,
  mockGetNFTLowestPrice,
  mockGetNFTOwners,
  mockGetNFTTrades,
  mockGetNFTMetadata,
  mockGetNFTTokenIdOwners,
  mockGetNFTTransfers,
  mockGetNFTTransfersByBlock,
  mockGetPairAddress,
  mockGetPairReserves,
  mockGetTokenAllowance,
  mockGetTokenMetadata,
  mockGetTokenMetadataBySymbol,
  mockGetTokenPrice,
  mockGetTokenTransfers,
  mockGetTransaction,
  mockGetWalletNFTs,
  mockGetWalletNFTTransfers,
  mockGetWalletTokenTransfers,
  mockGetWalletTransactions,
  mockResolveAddress,
  mockResolveDomain,
  mockRunContractFunction,
  mockSyncNFTContract,
  mockUploadFolder,
  mockWeb3ApiVersion,
  mockGetWalletNFTCollections
];

export const mockServer = setupServer(...handlers);
