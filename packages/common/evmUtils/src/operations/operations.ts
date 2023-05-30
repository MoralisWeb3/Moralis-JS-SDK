import { getNativeBalanceOperation, getNativeBalancesForAddressesOperation } from './balance';
import { getBlockOperation, getDateToBlockOperation } from './block';
import { getPairAddressOperation, getPairReservesOperation } from './defi';
import { getContractEventsOperation, getContractLogsOperation } from './events';
import { uploadFolderOperation } from './ipfs';
import {
  getContractNFTsOperation,
  getMultipleNFTsOperation,
  getNFTContractMetadataOperation,
  getNFTContractTransfersOperation,
  getNFTLowestPriceOperation,
  getNFTMetadataOperation,
  getNFTOwnersOperation,
  getNFTTokenIdOwnersOperation,
  getNFTTradesOperation,
  getNFTTransfersByBlockOperation,
  getNFTTransfersFromToBlockOperation,
  getNFTTransfersOperation,
  getWalletNFTCollectionsOperation,
  getWalletNFTsOperation,
  getWalletNFTTransfersOperation,
  reSyncMetadataOperation,
  searchNFTsOperation,
  syncNFTContractOperation,
} from './nft';
import { resolveAddressOperation, resolveDomainOperation, resolveENSDomainOperation } from './resolve';
import {
  getTokenAllowanceOperation,
  getTokenMetadataBySymbolOperation,
  getTokenMetadataOperation,
  getTokenPriceOperation,
  getTokenTransfersOperation,
  getWalletTokenBalancesOperation,
  getErc20MintsOperation,
  getWalletTokenTransfersOperation,
  getErc20ApprovalsOperation,
  getErc20BurnsOperation,
  getErc20TransfersOperation,
} from './token';
import {
  getTransactionOperation,
  getTransactionVerboseOperation,
  getWalletTransactionsOperation,
  getWalletTransactionsVerboseOperation,
  getInternalTransactionsOperation,
} from './transaction';
import { endpointWeightsOperation, runContractFunctionOperation, web3ApiVersionOperation } from './utils';

export const operationsV2 = [
  getBlockOperation,
  getContractEventsOperation,
  getContractLogsOperation,
  getContractNFTsOperation,
  getDateToBlockOperation,
  getErc20ApprovalsOperation,
  getErc20BurnsOperation,
  getErc20MintsOperation,
  getInternalTransactionsOperation,
  getMultipleNFTsOperation,
  getNativeBalanceOperation,
  getNativeBalancesForAddressesOperation,
  getNFTContractMetadataOperation,
  getNFTContractTransfersOperation,
  getNFTLowestPriceOperation,
  getNFTMetadataOperation,
  getNFTOwnersOperation,
  getNFTTokenIdOwnersOperation,
  getNFTTransfersByBlockOperation,
  getNFTTransfersFromToBlockOperation,
  getNFTTransfersOperation,
  getPairAddressOperation,
  getPairReservesOperation,
  getTokenAllowanceOperation,
  getTokenMetadataBySymbolOperation,
  getTokenMetadataOperation,
  getTokenPriceOperation,
  getTokenTransfersOperation,
  getTransactionOperation,
  getTransactionVerboseOperation,
  getWalletNFTCollectionsOperation,
  getWalletNFTsOperation,
  getWalletNFTTransfersOperation,
  getWalletTokenBalancesOperation,
  getWalletTokenTransfersOperation,
  getWalletTransactionsOperation,
  getWalletTransactionsVerboseOperation,
  resolveAddressOperation,
  resolveDomainOperation,
  resolveENSDomainOperation,
  reSyncMetadataOperation,
  runContractFunctionOperation,
  searchNFTsOperation,
  syncNFTContractOperation,
  uploadFolderOperation,
];

/**
 * @deprecated This list includes upgraded operations to the hybrid approach in the old format.
 */
export const operationsV2All = [
  ...operationsV2,
  endpointWeightsOperation,
  web3ApiVersionOperation,
  getNFTTradesOperation,
  getErc20TransfersOperation,
];
