import { MockServer } from '@moralisweb3/test-utils';
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
import { mockGetWalletNFTCollections } from './endpoints/getWalletNFTCollections';
import { mockGetWalletNFTs } from './endpoints/getWalletNFTs';
import { mockGetWalletNFTTransfers } from './endpoints/getWalletNFTTransfers';
import { mockResyncMetadata } from './endpoints/resyncMetadata';
import { mockSearchNFTs } from './endpoints/searchNFTs';
import { mockSyncNFTContract } from './endpoints/syncNFTContract';

export const mockServer2 = MockServer.create({ apiKey: MOCK_API_KEY, apiRoot: EVM_API_ROOT }, [
  mockGetContractNFTs,
  mockGetNFTContractMetadata,
  mockGetNFTContractTransfers,
  mockGetNFTLowestPrice,
  mockGetNFTOwners,
  mockGetNFTMetadata,
  mockGetNFTTokenIdOwners,
  mockGetNFTTrades,
  mockGetNFTTransfers,
  mockGetNFTTransfersByBlock,
  mockGetNFTTransfersFromToBlock,
  mockGetWalletNFTCollections,
  mockGetWalletNFTs,
  mockGetWalletNFTTransfers,
  mockResyncMetadata,
  mockSearchNFTs,
  mockSyncNFTContract,
]).start();
