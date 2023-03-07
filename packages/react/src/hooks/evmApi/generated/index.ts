/**
 * @warn This file is auto-generated
 * Don't modify it
 */
import Moralis from 'moralis'
import {
    endpointWeightsOperation,
    EndpointWeightsResponse,
    EndpointWeightsRequest,
    getBlockOperation,
    GetBlockResponse,
    GetBlockRequest,
    getContractEventsOperation,
    GetContractEventsResponse,
    GetContractEventsRequest,
    getContractLogsOperation,
    GetContractLogsResponse,
    GetContractLogsRequest,
    getContractNFTsOperation,
    GetContractNFTsResponse,
    GetContractNFTsRequest,
    getDateToBlockOperation,
    GetDateToBlockResponse,
    GetDateToBlockRequest,
    getMultipleNFTsOperation,
    GetMultipleNFTsResponse,
    GetMultipleNFTsRequest,
    getNativeBalanceOperation,
    GetNativeBalanceResponse,
    GetNativeBalanceRequest,
    getNativeBalancesForAddressesOperation,
    GetNativeBalancesForAddressesResponse,
    GetNativeBalancesForAddressesRequest,
    getNFTContractMetadataOperation,
    GetNFTContractMetadataResponse,
    GetNFTContractMetadataRequest,
    getNFTContractTransfersOperation,
    GetNFTContractTransfersResponse,
    GetNFTContractTransfersRequest,
    getNFTLowestPriceOperation,
    GetNFTLowestPriceResponse,
    GetNFTLowestPriceRequest,
    getNFTMetadataOperation,
    GetNFTMetadataResponse,
    GetNFTMetadataRequest,
    getNFTOwnersOperation,
    GetNFTOwnersResponse,
    GetNFTOwnersRequest,
    getNFTTokenIdOwnersOperation,
    GetNFTTokenIdOwnersResponse,
    GetNFTTokenIdOwnersRequest,
    getNFTTradesOperation,
    GetNFTTradesResponse,
    GetNFTTradesRequest,
    getNFTTransfersByBlockOperation,
    GetNFTTransfersByBlockResponse,
    GetNFTTransfersByBlockRequest,
    getNFTTransfersFromToBlockOperation,
    GetNFTTransfersFromToBlockResponse,
    GetNFTTransfersFromToBlockRequest,
    getNFTTransfersOperation,
    GetNFTTransfersResponse,
    GetNFTTransfersRequest,
    getPairAddressOperation,
    GetPairAddressResponse,
    GetPairAddressRequest,
    getPairReservesOperation,
    GetPairReservesResponse,
    GetPairReservesRequest,
    getTokenAllowanceOperation,
    GetTokenAllowanceResponse,
    GetTokenAllowanceRequest,
    getTokenMetadataBySymbolOperation,
    GetTokenMetadataBySymbolResponse,
    GetTokenMetadataBySymbolRequest,
    getTokenMetadataOperation,
    GetTokenMetadataResponse,
    GetTokenMetadataRequest,
    getTokenPriceOperation,
    GetTokenPriceResponse,
    GetTokenPriceRequest,
    getTokenTransfersOperation,
    GetTokenTransfersResponse,
    GetTokenTransfersRequest,
    getTransactionOperation,
    GetTransactionResponse,
    GetTransactionRequest,
    getWalletNFTCollectionsOperation,
    GetWalletNFTCollectionsResponse,
    GetWalletNFTCollectionsRequest,
    getWalletNFTsOperation,
    GetWalletNFTsResponse,
    GetWalletNFTsRequest,
    getWalletNFTTransfersOperation,
    GetWalletNFTTransfersResponse,
    GetWalletNFTTransfersRequest,
    getWalletTokenBalancesOperation,
    GetWalletTokenBalancesResponse,
    GetWalletTokenBalancesRequest,
    getWalletTokenTransfersOperation,
    GetWalletTokenTransfersResponse,
    GetWalletTokenTransfersRequest,
    getWalletTransactionsOperation,
    GetWalletTransactionsResponse,
    GetWalletTransactionsRequest,
    getWalletTransactionsVerboseOperation,
    GetWalletTransactionsVerboseResponse,
    GetWalletTransactionsVerboseRequest,
    resolveAddressOperation,
    ResolveAddressResponse,
    ResolveAddressRequest,
    resolveDomainOperation,
    ResolveDomainResponse,
    ResolveDomainRequest,
    reSyncMetadataOperation,
    ReSyncMetadataResponse,
    ReSyncMetadataRequest,
    runContractFunctionOperation,
    RunContractFunctionResponse,
    RunContractFunctionRequest,
    searchNFTsOperation,
    SearchNFTsResponse,
    SearchNFTsRequest,
    syncNFTContractOperation,
    SyncNFTContractResponse,
    SyncNFTContractRequest,
    uploadFolderOperation,
    UploadFolderResponse,
    UploadFolderRequest,
    web3ApiVersionOperation,
    Web3ApiVersionResponse,
    Web3ApiVersionRequest,
} from 'moralis/common-evm-utils';
import { _useResolver,_useResolverNullable,_useResolverPaginated, } from '../../resolvers';
import { QueryConfig } from '../../useQuery';

const { baseUrl } = Moralis.EvmApi;

export const useEvmEndpointWeights = (params?: QueryConfig<EndpointWeightsResponse, Error> & EndpointWeightsRequest) => {
  return _useResolver(endpointWeightsOperation, baseUrl, params);
};
export const useEvmBlock = (params?: QueryConfig<GetBlockResponse, Error> & GetBlockRequest) => {
  return _useResolverNullable(getBlockOperation, baseUrl, params);
};
export const useEvmContractEvents = (params?: QueryConfig<GetContractEventsResponse, Error> & GetContractEventsRequest) => {
  return _useResolverPaginated(getContractEventsOperation, baseUrl, params);
};
export const useEvmContractLogs = (params?: QueryConfig<GetContractLogsResponse, Error> & GetContractLogsRequest) => {
  return _useResolverPaginated(getContractLogsOperation, baseUrl, params);
};
export const useEvmContractNFTs = (params?: QueryConfig<GetContractNFTsResponse, Error> & GetContractNFTsRequest) => {
  return _useResolverPaginated(getContractNFTsOperation, baseUrl, params);
};
export const useEvmDateToBlock = (params?: QueryConfig<GetDateToBlockResponse, Error> & GetDateToBlockRequest) => {
  return _useResolver(getDateToBlockOperation, baseUrl, params);
};
export const useEvmMultipleNFTs = (params?: QueryConfig<GetMultipleNFTsResponse, Error> & GetMultipleNFTsRequest) => {
  return _useResolver(getMultipleNFTsOperation, baseUrl, params);
};
export const useEvmNativeBalance = (params?: QueryConfig<GetNativeBalanceResponse, Error> & GetNativeBalanceRequest) => {
  return _useResolver(getNativeBalanceOperation, baseUrl, params);
};
export const useEvmNativeBalancesForAddresses = (params?: QueryConfig<GetNativeBalancesForAddressesResponse, Error> & GetNativeBalancesForAddressesRequest) => {
  return _useResolver(getNativeBalancesForAddressesOperation, baseUrl, params);
};
export const useEvmNFTContractMetadata = (params?: QueryConfig<GetNFTContractMetadataResponse, Error> & GetNFTContractMetadataRequest) => {
  return _useResolverNullable(getNFTContractMetadataOperation, baseUrl, params);
};
export const useEvmNFTContractTransfers = (params?: QueryConfig<GetNFTContractTransfersResponse, Error> & GetNFTContractTransfersRequest) => {
  return _useResolverPaginated(getNFTContractTransfersOperation, baseUrl, params);
};
export const useEvmNFTLowestPrice = (params?: QueryConfig<GetNFTLowestPriceResponse, Error> & GetNFTLowestPriceRequest) => {
  return _useResolverNullable(getNFTLowestPriceOperation, baseUrl, params);
};
export const useEvmNFTMetadata = (params?: QueryConfig<GetNFTMetadataResponse, Error> & GetNFTMetadataRequest) => {
  return _useResolverNullable(getNFTMetadataOperation, baseUrl, params);
};
export const useEvmNFTOwners = (params?: QueryConfig<GetNFTOwnersResponse, Error> & GetNFTOwnersRequest) => {
  return _useResolverPaginated(getNFTOwnersOperation, baseUrl, params);
};
export const useEvmNFTTokenIdOwners = (params?: QueryConfig<GetNFTTokenIdOwnersResponse, Error> & GetNFTTokenIdOwnersRequest) => {
  return _useResolverPaginated(getNFTTokenIdOwnersOperation, baseUrl, params);
};
export const useEvmNFTTrades = (params?: QueryConfig<GetNFTTradesResponse, Error> & GetNFTTradesRequest) => {
  return _useResolverPaginated(getNFTTradesOperation, baseUrl, params);
};
export const useEvmNFTTransfersByBlock = (params?: QueryConfig<GetNFTTransfersByBlockResponse, Error> & GetNFTTransfersByBlockRequest) => {
  return _useResolverPaginated(getNFTTransfersByBlockOperation, baseUrl, params);
};
export const useEvmNFTTransfersFromToBlock = (params?: QueryConfig<GetNFTTransfersFromToBlockResponse, Error> & GetNFTTransfersFromToBlockRequest) => {
  return _useResolverPaginated(getNFTTransfersFromToBlockOperation, baseUrl, params);
};
export const useEvmNFTTransfers = (params?: QueryConfig<GetNFTTransfersResponse, Error> & GetNFTTransfersRequest) => {
  return _useResolverPaginated(getNFTTransfersOperation, baseUrl, params);
};
export const useEvmPairAddress = (params?: QueryConfig<GetPairAddressResponse, Error> & GetPairAddressRequest) => {
  return _useResolver(getPairAddressOperation, baseUrl, params);
};
export const useEvmPairReserves = (params?: QueryConfig<GetPairReservesResponse, Error> & GetPairReservesRequest) => {
  return _useResolver(getPairReservesOperation, baseUrl, params);
};
export const useEvmTokenAllowance = (params?: QueryConfig<GetTokenAllowanceResponse, Error> & GetTokenAllowanceRequest) => {
  return _useResolver(getTokenAllowanceOperation, baseUrl, params);
};
export const useEvmTokenMetadataBySymbol = (params?: QueryConfig<GetTokenMetadataBySymbolResponse, Error> & GetTokenMetadataBySymbolRequest) => {
  return _useResolver(getTokenMetadataBySymbolOperation, baseUrl, params);
};
export const useEvmTokenMetadata = (params?: QueryConfig<GetTokenMetadataResponse, Error> & GetTokenMetadataRequest) => {
  return _useResolver(getTokenMetadataOperation, baseUrl, params);
};
export const useEvmTokenPrice = (params?: QueryConfig<GetTokenPriceResponse, Error> & GetTokenPriceRequest) => {
  return _useResolver(getTokenPriceOperation, baseUrl, params);
};
export const useEvmTokenTransfers = (params?: QueryConfig<GetTokenTransfersResponse, Error> & GetTokenTransfersRequest) => {
  return _useResolverPaginated(getTokenTransfersOperation, baseUrl, params);
};
export const useEvmTransaction = (params?: QueryConfig<GetTransactionResponse, Error> & GetTransactionRequest) => {
  return _useResolverNullable(getTransactionOperation, baseUrl, params);
};
export const useEvmWalletNFTCollections = (params?: QueryConfig<GetWalletNFTCollectionsResponse, Error> & GetWalletNFTCollectionsRequest) => {
  return _useResolverPaginated(getWalletNFTCollectionsOperation, baseUrl, params);
};
export const useEvmWalletNFTs = (params?: QueryConfig<GetWalletNFTsResponse, Error> & GetWalletNFTsRequest) => {
  return _useResolverPaginated(getWalletNFTsOperation, baseUrl, params);
};
export const useEvmWalletNFTTransfers = (params?: QueryConfig<GetWalletNFTTransfersResponse, Error> & GetWalletNFTTransfersRequest) => {
  return _useResolverPaginated(getWalletNFTTransfersOperation, baseUrl, params);
};
export const useEvmWalletTokenBalances = (params?: QueryConfig<GetWalletTokenBalancesResponse, Error> & GetWalletTokenBalancesRequest) => {
  return _useResolver(getWalletTokenBalancesOperation, baseUrl, params);
};
export const useEvmWalletTokenTransfers = (params?: QueryConfig<GetWalletTokenTransfersResponse, Error> & GetWalletTokenTransfersRequest) => {
  return _useResolverPaginated(getWalletTokenTransfersOperation, baseUrl, params);
};
export const useEvmWalletTransactions = (params?: QueryConfig<GetWalletTransactionsResponse, Error> & GetWalletTransactionsRequest) => {
  return _useResolverPaginated(getWalletTransactionsOperation, baseUrl, params);
};
export const useEvmWalletTransactionsVerbose = (params?: QueryConfig<GetWalletTransactionsVerboseResponse, Error> & GetWalletTransactionsVerboseRequest) => {
  return _useResolverPaginated(getWalletTransactionsVerboseOperation, baseUrl, params);
};
export const useEvmResolveAddress = (params?: QueryConfig<ResolveAddressResponse, Error> & ResolveAddressRequest) => {
  return _useResolverNullable(resolveAddressOperation, baseUrl, params);
};
export const useEvmResolveDomain = (params?: QueryConfig<ResolveDomainResponse, Error> & ResolveDomainRequest) => {
  return _useResolverNullable(resolveDomainOperation, baseUrl, params);
};
export const useEvmReSyncMetadata = (params?: QueryConfig<ReSyncMetadataResponse, Error> & ReSyncMetadataRequest) => {
  return _useResolver(reSyncMetadataOperation, baseUrl, params);
};
export const useEvmRunContractFunction = (params?: QueryConfig<RunContractFunctionResponse, Error> & RunContractFunctionRequest) => {
  return _useResolver(runContractFunctionOperation, baseUrl, params);
};
export const useEvmSearchNFTs = (params?: QueryConfig<SearchNFTsResponse, Error> & SearchNFTsRequest) => {
  return _useResolverPaginated(searchNFTsOperation, baseUrl, params);
};
export const useEvmSyncNFTContract = (params?: QueryConfig<SyncNFTContractResponse, Error> & SyncNFTContractRequest) => {
  return _useResolver(syncNFTContractOperation, baseUrl, params);
};
export const useEvmUploadFolder = (params?: QueryConfig<UploadFolderResponse, Error> & UploadFolderRequest) => {
  return _useResolver(uploadFolderOperation, baseUrl, params);
};
export const useEvmWeb3ApiVersion = (params?: QueryConfig<Web3ApiVersionResponse, Error> & Web3ApiVersionRequest) => {
  return _useResolver(web3ApiVersionOperation, baseUrl, params);
};
