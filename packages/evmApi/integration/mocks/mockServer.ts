import { MockServer } from '@moralisweb3/test-utils';
import { mockEndpointWeights } from './endpoints/endpointWeights';
import { mockGetBlock } from './endpoints/getBlock';
import { mockGetContractEvents } from './endpoints/getContractEvents';
import { mockGetDateToBlock } from './endpoints/getDateToBlock';
import { mockGetContractLogs } from './endpoints/getContractLogs';
import { mockGetNativeBalance } from './endpoints/getNativeBalance';
import { mockGetPairAddress } from './endpoints/getPairAddress';
import { mockGetPairReserves } from './endpoints/getPairReserves';
import { mockGetTokenAllowance } from './endpoints/getTokenAllowance';
import { mockGetTokenMetadata } from './endpoints/getTokenMetadata';
import { mockGetTokenMetadataBySymbols } from './endpoints/getTokenMetadataBySymbol';
import { mockGetTokenPrice } from './endpoints/getTokenPrice';
import { mockGetTokenTransfers } from './endpoints/getTokenTransfers';
import { mockGetTransaction } from './endpoints/getTransaction';
import { mockGetWalletNFTCollections } from './endpoints/getWalletNFTCollections';
import { mockGetWalletNFTs } from './endpoints/getWalletNFTs';
import { mockGetWalletNFTTransfers } from './endpoints/getWalletNFTTransfers';
import { mockGetWalletTokenBalances } from './endpoints/getWalletTokenBalances';
import { mockGetWalletTokenTransfers } from './endpoints/getWalletTokenTransfers';
import { mockGetWalletTransactions } from './endpoints/getWalletTransactions';
import { mockResolveAddress } from './endpoints/resolveAddress';
import { mockResolveDomain } from './endpoints/resolveDomain';
import { mockRunContractFunction } from './endpoints/runContractFunction';
import { mockUploadFolder } from './endpoints/uploadFolder';
import { mockWeb3ApiVersion } from './endpoints/web3ApiVersion';
import { EVM_API_ROOT, MOCK_API_KEY } from './config';
import { mockGetContractNFTs } from './endpoints/getContractNFTs';
import { mockGetNFTContractMetadata } from './endpoints/getNFTContractMetadata';
import { mockGetNFTContractTransfers } from './endpoints/getNFTContractTransfers';
import { mockGetNFTMetadata } from './endpoints/getNFTMetadata';
import { mockGetNFTOwners } from './endpoints/getNFTOwners';
import { mockGetNFTTokenIdOwners } from './endpoints/getNFTTokenIdOwners';
import { mockGetNFTTrades } from './endpoints/getNFTTrades';
import { mockGetNFTTransfers } from './endpoints/getNFTTransfers';
import { mockGetNFTLowestPrice } from './endpoints/getNFTLowestPrice';
import { mockGetNFTTransfersByBlock } from './endpoints/getNFTTransfersByBlock';
import { mockGetNFTTransfersFromToBlock } from './endpoints/getNFTTransfersFromToBlock';
import { mockResyncMetadata } from './endpoints/resyncMetadata';
import { mockSearchNFTs } from './endpoints/searchNFTs';
import { mockSyncNFTContract } from './endpoints/syncNFTContract';

const handler = [
  mockGetDateToBlock,
  mockGetNFTContractTransfers,
  mockGetTransaction,
  mockGetWalletTransactions,
  mockGetContractEvents,
  mockGetContractLogs,
  mockGetBlock,
  mockUploadFolder,
  mockGetNativeBalance,
  mockGetTokenAllowance,
  mockGetTokenPrice,
  mockGetTokenMetadata,
  mockGetTokenMetadataBySymbols,
  mockGetTokenTransfers,
  mockGetWalletTokenBalances,
  mockGetWalletTokenTransfers,
  mockResolveAddress,
  mockResolveDomain,
  mockGetPairAddress,
  mockGetPairReserves,
  mockRunContractFunction,
  mockWeb3ApiVersion,
  mockEndpointWeights,
  mockGetNFTTransfersFromToBlock,
  mockSearchNFTs,
  mockGetContractNFTs,
  mockGetNFTContractMetadata,
  mockGetNFTLowestPrice,
  mockGetNFTOwners,
  mockGetNFTTrades,
  mockGetNFTMetadata,
  mockGetNFTTokenIdOwners,
  mockGetNFTTransfers,
  mockGetNFTTransfersByBlock,
  mockGetWalletNFTs,
  mockGetWalletNFTTransfers,
  mockResyncMetadata,
  mockSyncNFTContract,
  mockGetWalletNFTCollections,
];

export const mockServer = MockServer.create({ apiKey: MOCK_API_KEY, apiRoot: EVM_API_ROOT }, handler).start();
