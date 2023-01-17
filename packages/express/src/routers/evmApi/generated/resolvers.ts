import { 
  endpointWeightsOperation,
  getBlockOperation,
  getContractEventsOperation,
  getContractLogsOperation,
  getContractNFTsOperation,
  getDateToBlockOperation,
  getMultipleNFTsOperation,
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
} from 'moralis/common-evm-utils';
import { createResolver, createNullableResolver, createPaginatedResolver } from '../../../genericResolvers';
import Moralis from 'moralis';

export const evmEndpointWeightsResolver = createResolver(endpointWeightsOperation, Moralis.EvmApi.baseUrl);
export const evmGetBlockResolver = createNullableResolver(getBlockOperation, Moralis.EvmApi.baseUrl);
export const evmGetContractEventsResolver = createPaginatedResolver(getContractEventsOperation, Moralis.EvmApi.baseUrl);
export const evmGetContractLogsResolver = createPaginatedResolver(getContractLogsOperation, Moralis.EvmApi.baseUrl);
export const evmGetContractNFTsResolver = createPaginatedResolver(getContractNFTsOperation, Moralis.EvmApi.baseUrl);
export const evmGetDateToBlockResolver = createResolver(getDateToBlockOperation, Moralis.EvmApi.baseUrl);
export const evmGetMultipleNFTsResolver = createResolver(getMultipleNFTsOperation, Moralis.EvmApi.baseUrl);
export const evmGetNativeBalanceResolver = createResolver(getNativeBalanceOperation, Moralis.EvmApi.baseUrl);
export const evmGetNFTContractMetadataResolver = createNullableResolver(getNFTContractMetadataOperation, Moralis.EvmApi.baseUrl);
export const evmGetNFTContractTransfersResolver = createPaginatedResolver(getNFTContractTransfersOperation, Moralis.EvmApi.baseUrl);
export const evmGetNFTLowestPriceResolver = createNullableResolver(getNFTLowestPriceOperation, Moralis.EvmApi.baseUrl);
export const evmGetNFTMetadataResolver = createNullableResolver(getNFTMetadataOperation, Moralis.EvmApi.baseUrl);
export const evmGetNFTOwnersResolver = createPaginatedResolver(getNFTOwnersOperation, Moralis.EvmApi.baseUrl);
export const evmGetNFTTokenIdOwnersResolver = createPaginatedResolver(getNFTTokenIdOwnersOperation, Moralis.EvmApi.baseUrl);
export const evmGetNFTTradesResolver = createPaginatedResolver(getNFTTradesOperation, Moralis.EvmApi.baseUrl);
export const evmGetNFTTransfersByBlockResolver = createPaginatedResolver(getNFTTransfersByBlockOperation, Moralis.EvmApi.baseUrl);
export const evmGetNFTTransfersFromToBlockResolver = createPaginatedResolver(getNFTTransfersFromToBlockOperation, Moralis.EvmApi.baseUrl);
export const evmGetNFTTransfersResolver = createPaginatedResolver(getNFTTransfersOperation, Moralis.EvmApi.baseUrl);
export const evmGetPairAddressResolver = createResolver(getPairAddressOperation, Moralis.EvmApi.baseUrl);
export const evmGetPairReservesResolver = createResolver(getPairReservesOperation, Moralis.EvmApi.baseUrl);
export const evmGetTokenAllowanceResolver = createResolver(getTokenAllowanceOperation, Moralis.EvmApi.baseUrl);
export const evmGetTokenMetadataBySymbolResolver = createResolver(getTokenMetadataBySymbolOperation, Moralis.EvmApi.baseUrl);
export const evmGetTokenMetadataResolver = createResolver(getTokenMetadataOperation, Moralis.EvmApi.baseUrl);
export const evmGetTokenPriceResolver = createResolver(getTokenPriceOperation, Moralis.EvmApi.baseUrl);
export const evmGetTokenTransfersResolver = createPaginatedResolver(getTokenTransfersOperation, Moralis.EvmApi.baseUrl);
export const evmGetTransactionResolver = createNullableResolver(getTransactionOperation, Moralis.EvmApi.baseUrl);
export const evmGetWalletNFTCollectionsResolver = createPaginatedResolver(getWalletNFTCollectionsOperation, Moralis.EvmApi.baseUrl);
export const evmGetWalletNFTsResolver = createPaginatedResolver(getWalletNFTsOperation, Moralis.EvmApi.baseUrl);
export const evmGetWalletNFTTransfersResolver = createPaginatedResolver(getWalletNFTTransfersOperation, Moralis.EvmApi.baseUrl);
export const evmGetWalletTokenBalancesResolver = createResolver(getWalletTokenBalancesOperation, Moralis.EvmApi.baseUrl);
export const evmGetWalletTokenTransfersResolver = createPaginatedResolver(getWalletTokenTransfersOperation, Moralis.EvmApi.baseUrl);
export const evmGetWalletTransactionsResolver = createPaginatedResolver(getWalletTransactionsOperation, Moralis.EvmApi.baseUrl);
export const evmGetWalletTransactionsVerboseResolver = createPaginatedResolver(getWalletTransactionsVerboseOperation, Moralis.EvmApi.baseUrl);
export const evmResolveAddressResolver = createNullableResolver(resolveAddressOperation, Moralis.EvmApi.baseUrl);
export const evmResolveDomainResolver = createNullableResolver(resolveDomainOperation, Moralis.EvmApi.baseUrl);
export const evmReSyncMetadataResolver = createResolver(reSyncMetadataOperation, Moralis.EvmApi.baseUrl);
export const evmRunContractFunctionResolver = createResolver(runContractFunctionOperation, Moralis.EvmApi.baseUrl);
export const evmSearchNFTsResolver = createPaginatedResolver(searchNFTsOperation, Moralis.EvmApi.baseUrl);
export const evmSyncNFTContractResolver = createResolver(syncNFTContractOperation, Moralis.EvmApi.baseUrl);
export const evmUploadFolderResolver = createResolver(uploadFolderOperation, Moralis.EvmApi.baseUrl);
export const evmWeb3ApiVersionResolver = createResolver(web3ApiVersionOperation, Moralis.EvmApi.baseUrl);
