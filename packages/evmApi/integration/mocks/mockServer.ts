import { setupServer } from 'msw/node';
import { mockEndpointWeights } from './endpoints/endpointWeights';
import { mockGetBlock } from './endpoints/getBlock';
import { mockGetContractEvents } from './endpoints/getContractEvents';
import { mockGetContractNFTs } from './endpoints/getContractNFTs';
import { mockGetDateToBlock } from './endpoints/getDateToBlock';
import { mockGetContractLogs } from './endpoints/getContractLogs';
import { mockGetNativeBalance } from './endpoints/getNativeBalance';
import { mockGetNFTContractMetadata } from './endpoints/getNFTContractMetadata';
import { mockGetNFTContractTransfers } from './endpoints/getNFTContractTransfers';
import { mockGetNFTLowestPrice } from './endpoints/getNFTLowestPrice';
import { mockGetNFTMetadata } from './endpoints/getNFTMetadata';
import { mockGetNFTOwners } from './endpoints/getNFTOwners';
import { mockGetNFTTokenIdOwners } from './endpoints/getNFTTokenIdOwners';
import { mockGetNFTTrades } from './endpoints/getNFTTrades';
import { mockGetNFTTransfers } from './endpoints/getNFTTransfers';
import { mockGetNFTTransfersByBlock } from './endpoints/getNFTTransfersByBlock';
import { mockGetNFTTransfersFromToBlock } from './endpoints/getNFTTransfersFromToBlock';
import { mockGetPairAddress } from './endpoints/getPairAddress';
import { mockGetPairReserves } from './endpoints/getPairReserves';
import { mockGetTokenAllowance } from './endpoints/getTokenAllowance';
import { mockGetTokenMetadata } from './endpoints/getTokenMetadata';
import { mockGetTokenMetadataBySymbol } from './endpoints/getTokenMetadataBySymbol';
import { mockGetTokenPrice } from './endpoints/getTokenPrice';
import { mockGetTokenTransfers } from './endpoints/getTokenTransfers';
import { mockGetTransaction } from './endpoints/getTransaction';
import { mockGetWalletNFTCollections } from './endpoints/getWalletNFTCollections';
import { mockGetWalletNFTs } from './endpoints/getWalletNFTs';
import { mockGetWalletNFTTransfers } from './endpoints/getWalletNFTTransfers';
import { mockGetWalletTokenTransfers } from './endpoints/getWalletTokenTransfers';
import { mockGetWalletTransactions } from './endpoints/getWalletTransactions';
import { mockResolveAddress } from './endpoints/resolveAddress';
import { mockResolveDomain } from './endpoints/resolveDomain';
import { mockRunContractFunction } from './endpoints/runContractFunction';
import { mockSearchNFTs } from './endpoints/searchNFTs';
import { mockSyncNFTContract } from './endpoints/syncNFTContract';
import { mockUploadFolder } from './endpoints/uploadFolder';
import { mockWeb3ApiVersion } from './endpoints/web3ApiVersion';

const handlers = [
  mockGetNFTTransfersFromToBlock,
  mockSearchNFTs,
  mockEndpointWeights,
  mockGetBlock,
  mockGetContractEvents,
  mockGetContractNFTs,
  mockGetDateToBlock,
  mockGetContractLogs,
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
  mockGetWalletNFTCollections,
];

export const mockServer = setupServer(...handlers);
