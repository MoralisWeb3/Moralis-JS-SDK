
// CAUTION: This file is automatically generated. Do not edit it manually!

import { endpointWeightsOperation, EndpointWeightsRequest, EndpointWeightsResponseAdapter, runContractFunctionOperation, RunContractFunctionRequest, RunContractFunctionResponseAdapter, web3ApiVersionOperation, Web3ApiVersionRequest, Web3ApiVersionResponseAdapter, getBlockOperation, GetBlockRequest, GetBlockResponseAdapter, getDateToBlockOperation, GetDateToBlockRequest, GetDateToBlockResponseAdapter, getContractEventsOperation, GetContractEventsRequest, GetContractEventsResponseAdapter, getContractLogsOperation, GetContractLogsRequest, GetContractLogsResponseAdapter, getContractNFTsOperation, GetContractNFTsRequest, GetContractNFTsResponseAdapter, getNFTContractMetadataOperation, GetNFTContractMetadataRequest, GetNFTContractMetadataResponseAdapter, getNFTContractTransfersOperation, GetNFTContractTransfersRequest, GetNFTContractTransfersResponseAdapter, getNFTLowestPriceOperation, GetNFTLowestPriceRequest, GetNFTLowestPriceResponseAdapter, getNFTMetadataOperation, GetNFTMetadataRequest, GetNFTMetadataResponseAdapter, getNFTOwnersOperation, GetNFTOwnersRequest, GetNFTOwnersResponseAdapter, getNFTTokenIdOwnersOperation, GetNFTTokenIdOwnersRequest, GetNFTTokenIdOwnersResponseAdapter, getNFTTradesOperation, GetNFTTradesRequest, GetNFTTradesResponseAdapter, getNFTTransfersByBlockOperation, GetNFTTransfersByBlockRequest, GetNFTTransfersByBlockResponseAdapter, getNFTTransfersFromToBlockOperation, GetNFTTransfersFromToBlockRequest, GetNFTTransfersFromToBlockResponseAdapter, getNFTTransfersOperation, GetNFTTransfersRequest, GetNFTTransfersResponseAdapter, getWalletNFTCollectionsOperation, GetWalletNFTCollectionsRequest, GetWalletNFTCollectionsResponseAdapter, getWalletNFTsOperation, GetWalletNFTsRequest, GetWalletNFTsResponseAdapter, getWalletNFTTransfersOperation, GetWalletNFTTransfersRequest, GetWalletNFTTransfersResponseAdapter, reSyncMetadataOperation, ReSyncMetadataRequest, ReSyncMetadataResponseAdapter, searchNFTsOperation, SearchNFTsRequest, SearchNFTsResponseAdapter, syncNFTContractOperation, SyncNFTContractRequest, SyncNFTContractResponseAdapter, getNativeBalanceOperation, GetNativeBalanceRequest, GetNativeBalanceResponseAdapter, getPairAddressOperation, GetPairAddressRequest, GetPairAddressResponseAdapter, getPairReservesOperation, GetPairReservesRequest, GetPairReservesResponseAdapter, getTokenAllowanceOperation, GetTokenAllowanceRequest, GetTokenAllowanceResponseAdapter, getTokenMetadataBySymbolOperation, GetTokenMetadataBySymbolRequest, GetTokenMetadataBySymbolResponseAdapter, getTokenMetadataOperation, GetTokenMetadataRequest, GetTokenMetadataResponseAdapter, getTokenPriceOperation, GetTokenPriceRequest, GetTokenPriceResponseAdapter, getTokenTransfersOperation, GetTokenTransfersRequest, GetTokenTransfersResponseAdapter, getWalletTokenBalancesOperation, GetWalletTokenBalancesRequest, GetWalletTokenBalancesResponseAdapter, getWalletTokenTransfersOperation, GetWalletTokenTransfersRequest, GetWalletTokenTransfersResponseAdapter, getTransactionOperation, GetTransactionRequest, GetTransactionResponseAdapter, getWalletTransactionsOperation, GetWalletTransactionsRequest, GetWalletTransactionsResponseAdapter, getWalletTransactionsVerboseOperation, GetWalletTransactionsVerboseRequest, GetWalletTransactionsVerboseResponseAdapter, resolveAddressOperation, ResolveAddressRequest, ResolveAddressResponseAdapter, resolveDomainOperation, ResolveDomainRequest, ResolveDomainResponseAdapter, uploadFolderOperation, UploadFolderRequest, UploadFolderResponseAdapter } from '@moralisweb3/common-evm-utils';
import { ApiClient } from '@moralisweb3/client-backend-adapter-utils';
import { Module, Core, ModuleType } from '@moralisweb3/common-core';

const backendModuleName = 'evm-api';

export abstract class EvmApiClient implements Module {
  protected abstract core: Core;
  protected abstract apiClient: ApiClient;
  public abstract name: string;
  public readonly type = ModuleType.API;

  
  public readonly utils = {
   endpointWeights: (request: EndpointWeightsRequest): Promise<EndpointWeightsResponseAdapter> => {
      return this.apiClient.request(backendModuleName, request, endpointWeightsOperation);
    },
   runContractFunction: (request: RunContractFunctionRequest): Promise<RunContractFunctionResponseAdapter> => {
      return this.apiClient.request(backendModuleName, request, runContractFunctionOperation);
    },
   web3ApiVersion: (request: Web3ApiVersionRequest): Promise<Web3ApiVersionResponseAdapter> => {
      return this.apiClient.request(backendModuleName, request, web3ApiVersionOperation);
    },

  };

  public readonly block = {
   getBlock: (request: GetBlockRequest): Promise<GetBlockResponseAdapter | null> => {
      return this.apiClient.requestNullable(backendModuleName, request, getBlockOperation);
    },
   getDateToBlock: (request: GetDateToBlockRequest): Promise<GetDateToBlockResponseAdapter> => {
      return this.apiClient.request(backendModuleName, request, getDateToBlockOperation);
    },

  };

  public readonly events = {
   getContractEvents: (request: GetContractEventsRequest): Promise<GetContractEventsResponseAdapter> => {
      return this.apiClient.requestPaginated(backendModuleName, request, getContractEventsOperation);
    },
   getContractLogs: (request: GetContractLogsRequest): Promise<GetContractLogsResponseAdapter> => {
      return this.apiClient.requestPaginated(backendModuleName, request, getContractLogsOperation);
    },

  };

  public readonly nft = {
   getContractNFTs: (request: GetContractNFTsRequest): Promise<GetContractNFTsResponseAdapter> => {
      return this.apiClient.requestPaginated(backendModuleName, request, getContractNFTsOperation);
    },
   getNFTContractMetadata: (request: GetNFTContractMetadataRequest): Promise<GetNFTContractMetadataResponseAdapter | null> => {
      return this.apiClient.requestNullable(backendModuleName, request, getNFTContractMetadataOperation);
    },
   getNFTContractTransfers: (request: GetNFTContractTransfersRequest): Promise<GetNFTContractTransfersResponseAdapter> => {
      return this.apiClient.requestPaginated(backendModuleName, request, getNFTContractTransfersOperation);
    },
   getNFTLowestPrice: (request: GetNFTLowestPriceRequest): Promise<GetNFTLowestPriceResponseAdapter | null> => {
      return this.apiClient.requestNullable(backendModuleName, request, getNFTLowestPriceOperation);
    },
   getNFTMetadata: (request: GetNFTMetadataRequest): Promise<GetNFTMetadataResponseAdapter | null> => {
      return this.apiClient.requestNullable(backendModuleName, request, getNFTMetadataOperation);
    },
   getNFTOwners: (request: GetNFTOwnersRequest): Promise<GetNFTOwnersResponseAdapter> => {
      return this.apiClient.requestPaginated(backendModuleName, request, getNFTOwnersOperation);
    },
   getNFTTokenIdOwners: (request: GetNFTTokenIdOwnersRequest): Promise<GetNFTTokenIdOwnersResponseAdapter> => {
      return this.apiClient.requestPaginated(backendModuleName, request, getNFTTokenIdOwnersOperation);
    },
   getNFTTrades: (request: GetNFTTradesRequest): Promise<GetNFTTradesResponseAdapter> => {
      return this.apiClient.requestPaginated(backendModuleName, request, getNFTTradesOperation);
    },
   getNFTTransfersByBlock: (request: GetNFTTransfersByBlockRequest): Promise<GetNFTTransfersByBlockResponseAdapter> => {
      return this.apiClient.requestPaginated(backendModuleName, request, getNFTTransfersByBlockOperation);
    },
   getNFTTransfersFromToBlock: (request: GetNFTTransfersFromToBlockRequest): Promise<GetNFTTransfersFromToBlockResponseAdapter> => {
      return this.apiClient.requestPaginated(backendModuleName, request, getNFTTransfersFromToBlockOperation);
    },
   getNFTTransfers: (request: GetNFTTransfersRequest): Promise<GetNFTTransfersResponseAdapter> => {
      return this.apiClient.requestPaginated(backendModuleName, request, getNFTTransfersOperation);
    },
   getWalletNFTCollections: (request: GetWalletNFTCollectionsRequest): Promise<GetWalletNFTCollectionsResponseAdapter> => {
      return this.apiClient.requestPaginated(backendModuleName, request, getWalletNFTCollectionsOperation);
    },
   getWalletNFTs: (request: GetWalletNFTsRequest): Promise<GetWalletNFTsResponseAdapter> => {
      return this.apiClient.requestPaginated(backendModuleName, request, getWalletNFTsOperation);
    },
   getWalletNFTTransfers: (request: GetWalletNFTTransfersRequest): Promise<GetWalletNFTTransfersResponseAdapter> => {
      return this.apiClient.requestPaginated(backendModuleName, request, getWalletNFTTransfersOperation);
    },
   reSyncMetadata: (request: ReSyncMetadataRequest): Promise<ReSyncMetadataResponseAdapter> => {
      return this.apiClient.request(backendModuleName, request, reSyncMetadataOperation);
    },
   searchNFTs: (request: SearchNFTsRequest): Promise<SearchNFTsResponseAdapter> => {
      return this.apiClient.requestPaginated(backendModuleName, request, searchNFTsOperation);
    },
   syncNFTContract: (request: SyncNFTContractRequest): Promise<SyncNFTContractResponseAdapter> => {
      return this.apiClient.request(backendModuleName, request, syncNFTContractOperation);
    },

  };

  public readonly balance = {
   getNativeBalance: (request: GetNativeBalanceRequest): Promise<GetNativeBalanceResponseAdapter> => {
      return this.apiClient.request(backendModuleName, request, getNativeBalanceOperation);
    },

  };

  public readonly defi = {
   getPairAddress: (request: GetPairAddressRequest): Promise<GetPairAddressResponseAdapter> => {
      return this.apiClient.request(backendModuleName, request, getPairAddressOperation);
    },
   getPairReserves: (request: GetPairReservesRequest): Promise<GetPairReservesResponseAdapter> => {
      return this.apiClient.request(backendModuleName, request, getPairReservesOperation);
    },

  };

  public readonly token = {
   getTokenAllowance: (request: GetTokenAllowanceRequest): Promise<GetTokenAllowanceResponseAdapter> => {
      return this.apiClient.request(backendModuleName, request, getTokenAllowanceOperation);
    },
   getTokenMetadataBySymbol: (request: GetTokenMetadataBySymbolRequest): Promise<GetTokenMetadataBySymbolResponseAdapter> => {
      return this.apiClient.request(backendModuleName, request, getTokenMetadataBySymbolOperation);
    },
   getTokenMetadata: (request: GetTokenMetadataRequest): Promise<GetTokenMetadataResponseAdapter> => {
      return this.apiClient.request(backendModuleName, request, getTokenMetadataOperation);
    },
   getTokenPrice: (request: GetTokenPriceRequest): Promise<GetTokenPriceResponseAdapter> => {
      return this.apiClient.request(backendModuleName, request, getTokenPriceOperation);
    },
   getTokenTransfers: (request: GetTokenTransfersRequest): Promise<GetTokenTransfersResponseAdapter> => {
      return this.apiClient.requestPaginated(backendModuleName, request, getTokenTransfersOperation);
    },
   getWalletTokenBalances: (request: GetWalletTokenBalancesRequest): Promise<GetWalletTokenBalancesResponseAdapter> => {
      return this.apiClient.request(backendModuleName, request, getWalletTokenBalancesOperation);
    },
   getWalletTokenTransfers: (request: GetWalletTokenTransfersRequest): Promise<GetWalletTokenTransfersResponseAdapter> => {
      return this.apiClient.requestPaginated(backendModuleName, request, getWalletTokenTransfersOperation);
    },

  };

  public readonly transaction = {
   getTransaction: (request: GetTransactionRequest): Promise<GetTransactionResponseAdapter | null> => {
      return this.apiClient.requestNullable(backendModuleName, request, getTransactionOperation);
    },
   getWalletTransactions: (request: GetWalletTransactionsRequest): Promise<GetWalletTransactionsResponseAdapter> => {
      return this.apiClient.requestPaginated(backendModuleName, request, getWalletTransactionsOperation);
    },
   getWalletTransactionsVerbose: (request: GetWalletTransactionsVerboseRequest): Promise<GetWalletTransactionsVerboseResponseAdapter> => {
      return this.apiClient.requestPaginated(backendModuleName, request, getWalletTransactionsVerboseOperation);
    },

  };

  public readonly resolve = {
   resolveAddress: (request: ResolveAddressRequest): Promise<ResolveAddressResponseAdapter | null> => {
      return this.apiClient.requestNullable(backendModuleName, request, resolveAddressOperation);
    },
   resolveDomain: (request: ResolveDomainRequest): Promise<ResolveDomainResponseAdapter | null> => {
      return this.apiClient.requestNullable(backendModuleName, request, resolveDomainOperation);
    },

  };

  public readonly ipfs = {
   uploadFolder: (request: UploadFolderRequest): Promise<UploadFolderResponseAdapter> => {
      return this.apiClient.request(backendModuleName, request, uploadFolderOperation);
    },

  };

}
