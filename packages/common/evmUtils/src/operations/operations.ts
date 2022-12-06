import { getNativeBalanceOperation } from './balance';
import { getBlockOperation, getDateToBlockOperation } from './block';
import { getPairAddressOperation, getPairReservesOperation } from './defi';
import { getContractEventsOperation, getContractLogsOperation } from './events';
import { uploadFolderOperation } from './ipfs';
import {
  getContractNFTsOperation,
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
import { resolveAddressOperation, resolveDomainOperation } from './resolve';
import {
  getTokenAllowanceOperation,
  getTokenMetadataBySymbolOperation,
  getTokenMetadataOperation,
  getTokenPriceOperation,
  getTokenTransfersOperation,
  getWalletTokenBalancesOperation,
} from './token';
import { getWalletTokenTransfersOperation } from './token/getWalletTokenTransfersOperation';
import {
  getTransactionOperation,
  getWalletTransactionsOperation,
  getWalletTransactionsVerboseOperation,
} from './transaction';
import { endpointWeightsOperation, web3ApiVersionOperation } from './utils';
import { runContractFunctionOperation } from './utils/runContractFunctionOperation';

export const operations = [
  endpointWeightsOperation,
  getBlockOperation,
  getContractEventsOperation,
  getContractLogsOperation,
  getContractNFTsOperation,
  getDateToBlockOperation,
  getNativeBalanceOperation,
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
  getPairAddressOperation,
  getPairReservesOperation,
  getTokenAllowanceOperation,
  getTokenMetadataBySymbolOperation,
  getTokenMetadataOperation,
  getTokenPriceOperation,
  getTokenTransfersOperation,
  getTransactionOperation,
  getWalletNFTCollectionsOperation,
  getWalletNFTsOperation,
  getWalletNFTTransfersOperation,
  getWalletTokenBalancesOperation,
  getWalletTokenTransfersOperation,
  getWalletTransactionsOperation,
  getWalletTransactionsVerboseOperation,
  resolveAddressOperation,
  resolveDomainOperation,
  reSyncMetadataOperation,
  runContractFunctionOperation,
  searchNFTsOperation,
  syncNFTContractOperation,
  uploadFolderOperation,
  web3ApiVersionOperation,
];
