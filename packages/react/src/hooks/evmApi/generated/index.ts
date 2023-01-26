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

export const useEvmEndpointWeights = () => {
  return _useResolver(endpointWeightsOperation, {});
};
export const useEvmBlock = (request?: GetBlockRequest) => {
  return _useResolverNullable(getBlockOperation, request);
};
export const useEvmContractEvents = (request?: GetContractEventsRequest) => {
  return _useResolverPaginated(getContractEventsOperation, request);
};
export const useEvmContractLogs = (request?: GetContractLogsRequest) => {
  return _useResolverPaginated(getContractLogsOperation, request);
};
export const useEvmContractNFTs = (request?: GetContractNFTsRequest) => {
  return _useResolverPaginated(getContractNFTsOperation, request);
};
export const useEvmDateToBlock = (request?: GetDateToBlockRequest) => {
  return _useResolver(getDateToBlockOperation, request);
};
export const useEvmMultipleNFTs = (request?: GetMultipleNFTsRequest) => {
  return _useResolver(getMultipleNFTsOperation, request);
};
export const useEvmNativeBalance = (request?: GetNativeBalanceRequest) => {
  return _useResolver(getNativeBalanceOperation, request);
};
export const useEvmNFTContractMetadata = (request?: GetNFTContractMetadataRequest) => {
  return _useResolverNullable(getNFTContractMetadataOperation, request);
};
export const useEvmNFTContractTransfers = (request?: GetNFTContractTransfersRequest) => {
  return _useResolverPaginated(getNFTContractTransfersOperation, request);
};
export const useEvmNFTLowestPrice = (request?: GetNFTLowestPriceRequest) => {
  return _useResolverNullable(getNFTLowestPriceOperation, request);
};
export const useEvmNFTMetadata = (request?: GetNFTMetadataRequest) => {
  return _useResolverNullable(getNFTMetadataOperation, request);
};
export const useEvmNFTOwners = (request?: GetNFTOwnersRequest) => {
  return _useResolverPaginated(getNFTOwnersOperation, request);
};
export const useEvmNFTTokenIdOwners = (request?: GetNFTTokenIdOwnersRequest) => {
  return _useResolverPaginated(getNFTTokenIdOwnersOperation, request);
};
export const useEvmNFTTrades = (request?: GetNFTTradesRequest) => {
  return _useResolverPaginated(getNFTTradesOperation, request);
};
export const useEvmNFTTransfersByBlock = (request?: GetNFTTransfersByBlockRequest) => {
  return _useResolverPaginated(getNFTTransfersByBlockOperation, request);
};
export const useEvmNFTTransfersFromToBlock = (request?: GetNFTTransfersFromToBlockRequest) => {
  return _useResolverPaginated(getNFTTransfersFromToBlockOperation, request);
};
export const useEvmNFTTransfers = (request?: GetNFTTransfersRequest) => {
  return _useResolverPaginated(getNFTTransfersOperation, request);
};
export const useEvmPairAddress = (request?: GetPairAddressRequest) => {
  return _useResolver(getPairAddressOperation, request);
};
export const useEvmPairReserves = (request?: GetPairReservesRequest) => {
  return _useResolver(getPairReservesOperation, request);
};
export const useEvmTokenAllowance = (request?: GetTokenAllowanceRequest) => {
  return _useResolver(getTokenAllowanceOperation, request);
};
export const useEvmTokenMetadataBySymbol = (request?: GetTokenMetadataBySymbolRequest) => {
  return _useResolver(getTokenMetadataBySymbolOperation, request);
};
export const useEvmTokenMetadata = (request?: GetTokenMetadataRequest) => {
  return _useResolver(getTokenMetadataOperation, request);
};
export const useEvmTokenPrice = (request?: GetTokenPriceRequest) => {
  return _useResolver(getTokenPriceOperation, request);
};
export const useEvmTokenTransfers = (request?: GetTokenTransfersRequest) => {
  return _useResolverPaginated(getTokenTransfersOperation, request);
};
export const useEvmTransaction = (request?: GetTransactionRequest) => {
  return _useResolverNullable(getTransactionOperation, request);
};
export const useEvmWalletNFTCollections = (request?: GetWalletNFTCollectionsRequest) => {
  return _useResolverPaginated(getWalletNFTCollectionsOperation, request);
};
export const useEvmWalletNFTs = (request?: GetWalletNFTsRequest) => {
  return _useResolverPaginated(getWalletNFTsOperation, request);
};
export const useEvmWalletNFTTransfers = (request?: GetWalletNFTTransfersRequest) => {
  return _useResolverPaginated(getWalletNFTTransfersOperation, request);
};
export const useEvmWalletTokenBalances = (request?: GetWalletTokenBalancesRequest) => {
  return _useResolver(getWalletTokenBalancesOperation, request);
};
export const useEvmWalletTokenTransfers = (request?: GetWalletTokenTransfersRequest) => {
  return _useResolverPaginated(getWalletTokenTransfersOperation, request);
};
export const useEvmWalletTransactions = (request?: GetWalletTransactionsRequest) => {
  return _useResolverPaginated(getWalletTransactionsOperation, request);
};
export const useEvmWalletTransactionsVerbose = (request?: GetWalletTransactionsVerboseRequest) => {
  return _useResolverPaginated(getWalletTransactionsVerboseOperation, request);
};
export const useEvmResolveAddress = (request?: ResolveAddressRequest) => {
  return _useResolverNullable(resolveAddressOperation, request);
};
export const useEvmResolveDomain = (request?: ResolveDomainRequest) => {
  return _useResolverNullable(resolveDomainOperation, request);
};
export const useEvmReSyncMetadata = (request?: ReSyncMetadataRequest) => {
  return _useResolver(reSyncMetadataOperation, request);
};
export const useEvmRunContractFunction = (request?: RunContractFunctionRequest) => {
  return _useResolver(runContractFunctionOperation, request);
};
export const useEvmSearchNFTs = (request?: SearchNFTsRequest) => {
  return _useResolverPaginated(searchNFTsOperation, request);
};
export const useEvmSyncNFTContract = (request?: SyncNFTContractRequest) => {
  return _useResolver(syncNFTContractOperation, request);
};
export const useEvmUploadFolder = (request?: UploadFolderRequest) => {
  return _useResolver(uploadFolderOperation, request);
};
export const useEvmWeb3ApiVersion = () => {
  return _useResolver(web3ApiVersionOperation, {});
};
