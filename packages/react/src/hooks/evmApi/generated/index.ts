/**
 * @warn This file is auto-generated
 * Don't modify it
 */
import {
    endpointWeightsOperation,
    
    getBlockOperation,
    GetBlockRequest,
    getContractEventsOperation,
    GetContractEventsRequest,
    getContractLogsOperation,
    GetContractLogsRequest,
    getContractNFTsOperation,
    GetContractNFTsRequest,
    getDateToBlockOperation,
    GetDateToBlockRequest,
    getMultipleNFTsOperation,
    GetMultipleNFTsRequest,
    getNativeBalanceOperation,
    GetNativeBalanceRequest,
    getNFTContractMetadataOperation,
    GetNFTContractMetadataRequest,
    getNFTContractTransfersOperation,
    GetNFTContractTransfersRequest,
    getNFTLowestPriceOperation,
    GetNFTLowestPriceRequest,
    getNFTMetadataOperation,
    GetNFTMetadataRequest,
    getNFTOwnersOperation,
    GetNFTOwnersRequest,
    getNFTTokenIdOwnersOperation,
    GetNFTTokenIdOwnersRequest,
    getNFTTradesOperation,
    GetNFTTradesRequest,
    getNFTTransfersByBlockOperation,
    GetNFTTransfersByBlockRequest,
    getNFTTransfersFromToBlockOperation,
    GetNFTTransfersFromToBlockRequest,
    getNFTTransfersOperation,
    GetNFTTransfersRequest,
    getPairAddressOperation,
    GetPairAddressRequest,
    getPairReservesOperation,
    GetPairReservesRequest,
    getTokenAllowanceOperation,
    GetTokenAllowanceRequest,
    getTokenMetadataBySymbolOperation,
    GetTokenMetadataBySymbolRequest,
    getTokenMetadataOperation,
    GetTokenMetadataRequest,
    getTokenPriceOperation,
    GetTokenPriceRequest,
    getTokenTransfersOperation,
    GetTokenTransfersRequest,
    getTransactionOperation,
    GetTransactionRequest,
    getWalletNFTCollectionsOperation,
    GetWalletNFTCollectionsRequest,
    getWalletNFTsOperation,
    GetWalletNFTsRequest,
    getWalletNFTTransfersOperation,
    GetWalletNFTTransfersRequest,
    getWalletTokenBalancesOperation,
    GetWalletTokenBalancesRequest,
    getWalletTokenTransfersOperation,
    GetWalletTokenTransfersRequest,
    getWalletTransactionsOperation,
    GetWalletTransactionsRequest,
    getWalletTransactionsVerboseOperation,
    GetWalletTransactionsVerboseRequest,
    resolveAddressOperation,
    ResolveAddressRequest,
    resolveDomainOperation,
    ResolveDomainRequest,
    reSyncMetadataOperation,
    ReSyncMetadataRequest,
    runContractFunctionOperation,
    RunContractFunctionRequest,
    searchNFTsOperation,
    SearchNFTsRequest,
    syncNFTContractOperation,
    SyncNFTContractRequest,
    uploadFolderOperation,
    UploadFolderRequest,
    web3ApiVersionOperation,
    
} from 'moralis/common-evm-utils';
import { _useResolver,_useResolverNullable,_useResolverPaginated, } from '../../resolvers';
import Moralis from 'moralis'

const { baseUrl } = Moralis.EvmApi;

export const useEvmEndpointWeights = () => {
  return _useResolver(endpointWeightsOperation, baseUrl, {});
};
export const useEvmBlock = (request?: GetBlockRequest) => {
  return _useResolverNullable(getBlockOperation, baseUrl, request);
};
export const useEvmContractEvents = (request?: GetContractEventsRequest) => {
  return _useResolverPaginated(getContractEventsOperation, baseUrl, request);
};
export const useEvmContractLogs = (request?: GetContractLogsRequest) => {
  return _useResolverPaginated(getContractLogsOperation, baseUrl, request);
};
export const useEvmContractNFTs = (request?: GetContractNFTsRequest) => {
  return _useResolverPaginated(getContractNFTsOperation, baseUrl, request);
};
export const useEvmDateToBlock = (request?: GetDateToBlockRequest) => {
  return _useResolver(getDateToBlockOperation, baseUrl, request);
};
export const useEvmMultipleNFTs = (request?: GetMultipleNFTsRequest) => {
  return _useResolver(getMultipleNFTsOperation, baseUrl, request);
};
export const useEvmNativeBalance = (request?: GetNativeBalanceRequest) => {
  return _useResolver(getNativeBalanceOperation, baseUrl, request);
};
export const useEvmNFTContractMetadata = (request?: GetNFTContractMetadataRequest) => {
  return _useResolverNullable(getNFTContractMetadataOperation, baseUrl, request);
};
export const useEvmNFTContractTransfers = (request?: GetNFTContractTransfersRequest) => {
  return _useResolverPaginated(getNFTContractTransfersOperation, baseUrl, request);
};
export const useEvmNFTLowestPrice = (request?: GetNFTLowestPriceRequest) => {
  return _useResolverNullable(getNFTLowestPriceOperation, baseUrl, request);
};
export const useEvmNFTMetadata = (request?: GetNFTMetadataRequest) => {
  return _useResolverNullable(getNFTMetadataOperation, baseUrl, request);
};
export const useEvmNFTOwners = (request?: GetNFTOwnersRequest) => {
  return _useResolverPaginated(getNFTOwnersOperation, baseUrl, request);
};
export const useEvmNFTTokenIdOwners = (request?: GetNFTTokenIdOwnersRequest) => {
  return _useResolverPaginated(getNFTTokenIdOwnersOperation, baseUrl, request);
};
export const useEvmNFTTrades = (request?: GetNFTTradesRequest) => {
  return _useResolverPaginated(getNFTTradesOperation, baseUrl, request);
};
export const useEvmNFTTransfersByBlock = (request?: GetNFTTransfersByBlockRequest) => {
  return _useResolverPaginated(getNFTTransfersByBlockOperation, baseUrl, request);
};
export const useEvmNFTTransfersFromToBlock = (request?: GetNFTTransfersFromToBlockRequest) => {
  return _useResolverPaginated(getNFTTransfersFromToBlockOperation, baseUrl, request);
};
export const useEvmNFTTransfers = (request?: GetNFTTransfersRequest) => {
  return _useResolverPaginated(getNFTTransfersOperation, baseUrl, request);
};
export const useEvmPairAddress = (request?: GetPairAddressRequest) => {
  return _useResolver(getPairAddressOperation, baseUrl, request);
};
export const useEvmPairReserves = (request?: GetPairReservesRequest) => {
  return _useResolver(getPairReservesOperation, baseUrl, request);
};
export const useEvmTokenAllowance = (request?: GetTokenAllowanceRequest) => {
  return _useResolver(getTokenAllowanceOperation, baseUrl, request);
};
export const useEvmTokenMetadataBySymbol = (request?: GetTokenMetadataBySymbolRequest) => {
  return _useResolver(getTokenMetadataBySymbolOperation, baseUrl, request);
};
export const useEvmTokenMetadata = (request?: GetTokenMetadataRequest) => {
  return _useResolver(getTokenMetadataOperation, baseUrl, request);
};
export const useEvmTokenPrice = (request?: GetTokenPriceRequest) => {
  return _useResolver(getTokenPriceOperation, baseUrl, request);
};
export const useEvmTokenTransfers = (request?: GetTokenTransfersRequest) => {
  return _useResolverPaginated(getTokenTransfersOperation, baseUrl, request);
};
export const useEvmTransaction = (request?: GetTransactionRequest) => {
  return _useResolverNullable(getTransactionOperation, baseUrl, request);
};
export const useEvmWalletNFTCollections = (request?: GetWalletNFTCollectionsRequest) => {
  return _useResolverPaginated(getWalletNFTCollectionsOperation, baseUrl, request);
};
export const useEvmWalletNFTs = (request?: GetWalletNFTsRequest) => {
  return _useResolverPaginated(getWalletNFTsOperation, baseUrl, request);
};
export const useEvmWalletNFTTransfers = (request?: GetWalletNFTTransfersRequest) => {
  return _useResolverPaginated(getWalletNFTTransfersOperation, baseUrl, request);
};
export const useEvmWalletTokenBalances = (request?: GetWalletTokenBalancesRequest) => {
  return _useResolver(getWalletTokenBalancesOperation, baseUrl, request);
};
export const useEvmWalletTokenTransfers = (request?: GetWalletTokenTransfersRequest) => {
  return _useResolverPaginated(getWalletTokenTransfersOperation, baseUrl, request);
};
export const useEvmWalletTransactions = (request?: GetWalletTransactionsRequest) => {
  return _useResolverPaginated(getWalletTransactionsOperation, baseUrl, request);
};
export const useEvmWalletTransactionsVerbose = (request?: GetWalletTransactionsVerboseRequest) => {
  return _useResolverPaginated(getWalletTransactionsVerboseOperation, baseUrl, request);
};
export const useEvmResolveAddress = (request?: ResolveAddressRequest) => {
  return _useResolverNullable(resolveAddressOperation, baseUrl, request);
};
export const useEvmResolveDomain = (request?: ResolveDomainRequest) => {
  return _useResolverNullable(resolveDomainOperation, baseUrl, request);
};
export const useEvmReSyncMetadata = (request?: ReSyncMetadataRequest) => {
  return _useResolver(reSyncMetadataOperation, baseUrl, request);
};
export const useEvmRunContractFunction = (request?: RunContractFunctionRequest) => {
  return _useResolver(runContractFunctionOperation, baseUrl, request);
};
export const useEvmSearchNFTs = (request?: SearchNFTsRequest) => {
  return _useResolverPaginated(searchNFTsOperation, baseUrl, request);
};
export const useEvmSyncNFTContract = (request?: SyncNFTContractRequest) => {
  return _useResolver(syncNFTContractOperation, baseUrl, request);
};
export const useEvmUploadFolder = (request?: UploadFolderRequest) => {
  return _useResolver(uploadFolderOperation, baseUrl, request);
};
export const useEvmWeb3ApiVersion = () => {
  return _useResolver(web3ApiVersionOperation, baseUrl, {});
};
