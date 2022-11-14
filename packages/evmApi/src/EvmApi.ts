import {
  ApiModule,
  Core,
  CoreProvider,
  Operation,
  PaginatedOperation,
  PaginatedRequest,
} from '@moralisweb3/common-core';
import { EvmApiConfigSetup } from './config/EvmApiConfigSetup';
import { OperationResolver, PaginatedOperationResolver, NullableOperationResolver } from '@moralisweb3/api-utils';
import {
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
  resolveAddressOperation,
  resolveDomainOperation,
  reSyncMetadataOperation,
  runContractFunctionOperation,
  searchNFTsOperation,
  syncNFTContractOperation,
  uploadFolderOperation,
  web3ApiVersionOperation,
} from '@moralisweb3/common-evm-utils';

const BASE_URL = 'https://deep-index.moralis.io/api/v2';

export class EvmApi extends ApiModule {
  public static readonly moduleName = 'evmApi';

  public static create(core?: Core): EvmApi {
    return new EvmApi(core ?? CoreProvider.getDefault());
  }

  private constructor(core: Core) {
    super(EvmApi.moduleName, core, BASE_URL);
  }

  public setup() {
    EvmApiConfigSetup.register(this.core.config);
  }

  public start() {
    // Nothing
  }

  public readonly nft = {
    getNFTTransfersByBlock: this.createPaginatedFetcher(getNFTTransfersByBlockOperation),
    getWalletNFTs: this.createPaginatedFetcher(getWalletNFTsOperation),
    getWalletNFTTransfers: this.createPaginatedFetcher(getWalletNFTTransfersOperation),
    getNFTTrades: this.createPaginatedFetcher(getNFTTradesOperation),
    getNFTLowestPrice: this.createNullableFetcher(getNFTLowestPriceOperation),
    searchNFTs: this.createPaginatedFetcher(searchNFTsOperation),
    getNFTTransfersFromToBlock: this.createPaginatedFetcher(getNFTTransfersFromToBlockOperation),
    getContractNFTs: this.createPaginatedFetcher(getContractNFTsOperation),
    getNFTOwners: this.createPaginatedFetcher(getNFTOwnersOperation),
    getNFTContractMetadata: this.createNullableFetcher(getNFTContractMetadataOperation),
    reSyncMetadata: this.createFetcher(reSyncMetadataOperation),
    getNFTMetadata: this.createNullableFetcher(getNFTMetadataOperation),
    getNFTTokenIdOwners: this.createPaginatedFetcher(getNFTTokenIdOwnersOperation),
    getNFTTransfers: this.createPaginatedFetcher(getNFTTransfersOperation),
    syncNFTContract: this.createFetcher(syncNFTContractOperation),
    getNFTContractTransfers: this.createPaginatedFetcher(getNFTContractTransfersOperation),
    getWalletNFTCollections: this.createPaginatedFetcher(getWalletNFTCollectionsOperation),
  };

  private readonly _token = {
    getTokenTransfers: this.createPaginatedFetcher(getTokenTransfersOperation),
  };

  public readonly token = {
    getWalletTokenBalances: this.createFetcher(getWalletTokenBalancesOperation),
    getWalletTokenTransfers: this.createPaginatedFetcher(getWalletTokenTransfersOperation),
    getTokenMetadata: this.createFetcher(getTokenMetadataOperation),
    getTokenMetadataBySymbol: this.createFetcher(getTokenMetadataBySymbolOperation),
    getTokenPrice: this.createFetcher(getTokenPriceOperation),
    getTokenTransfers: this._token.getTokenTransfers,
    getTokenAllowance: this.createFetcher(getTokenAllowanceOperation),

    /**
     * @deprecated Replaced by `nft.getContractNFTs()`.
     */
    getAllTokenIds: this.deprecationWarning('token.getAllTokenIds', 'nft.getContractNFTs', this.nft.getContractNFTs),
    /**
     * @deprecated Replaced by `nft.getNFTContractTransfers()`.
     */
    getContractNFTTransfers: this.deprecationWarning(
      'token.getContractNFTTransfers',
      'nft.getNFTContractTransfers',
      this.nft.getNFTContractTransfers,
    ),
    /**
     * @deprecated Replaced by `nft.getNFTLowestPrice()`.
     */
    getNFTLowestPrice: this.deprecationWarning(
      'token.getNFTLowestPrice',
      'nft.getNFTLowestPrice',
      this.nft.getNFTLowestPrice,
    ),
    /**
     * @deprecated Replaced by `nft.getNFTContractMetadata()`.
     */
    getNFTMetadata: this.deprecationWarning(
      'token.getNFTMetadata',
      'nft.getNFTContractMetadata',
      this.nft.getNFTContractMetadata,
    ),
    /**
     * @deprecated Replaced by `nft.getNFTOwners()`.
     */
    getNFTOwners: this.deprecationWarning('token.getNFTOwners', 'nft.getNFTOwners', this.nft.getNFTOwners),
    /**
     * @deprecated Replaced by `nft.getNFTTrades()`.
     */
    getNFTTrades: this.deprecationWarning('token.getNFTTrades', 'nft.getNFTTrades', this.nft.getNFTTrades),
    /**
     * @deprecated Replaced by `nft.getNFTTransfersFromToBlock()`.
     */
    getNftTransfersFromToBlock: this.deprecationWarning(
      'token.getNftTransfersFromToBlock',
      'nft.getNFTTransfersFromToBlock',
      this.nft.getNFTTransfersFromToBlock,
    ),
    /**
     * @deprecated Replaced by `token.getTokenTransfers()`.
     */
    getTokenAddressTransfers: this.deprecationWarning(
      'token.getTokenAddressTransfers',
      'token.getTokenTransfers',
      this._token.getTokenTransfers,
    ),
    /**
     * @deprecated Replaced by `nft.getNFTMetadata()`.
     */
    getTokenIdMetadata: this.deprecationWarning(
      'token.getTokenIdMetadata',
      'nft.getNFTMetadata',
      this.nft.getNFTMetadata,
    ),
    /**
     * @deprecated Replaced by `nft.getNFTTokenIdOwners()`.
     */
    getTokenIdOwners: this.deprecationWarning(
      'token.getTokenIdOwners',
      'nft.getNFTTokenIdOwners',
      this.nft.getNFTTokenIdOwners,
    ),
    /**
     * @deprecated Replaced by `nft.getNFTTransfers()`.
     */
    getWalletTokenIdTransfers: this.deprecationWarning(
      'token.getWalletTokenIdTransfers',
      'nft.getNFTTransfers',
      this.nft.getNFTTransfers,
    ),
    /**
     * @deprecated Replaced by `nft.reSyncMetadata()`.
     */
    reSyncMetadata: this.deprecationWarning('token.reSyncMetadata', 'nft.reSyncMetadata', this.nft.reSyncMetadata),
    /**
     * @deprecated Replaced by `nft.searchNFTs()`.
     */
    searchNFTs: this.deprecationWarning('token.searchNFTs', 'nft.searchNFTs', this.nft.searchNFTs),
    /**
     * @deprecated Replaced by `nft.syncNFTContract()`.
     */
    syncNFTContract: this.deprecationWarning('token.syncNFTContract', 'nft.syncNFTContract', this.nft.syncNFTContract),
  };

  /**
   * @deprecated This property will be removed soon.
   */
  public readonly contract = {
    /**
     * @deprecated Replaced by `nft.syncNFTContract()`.
     */
    syncNFTContract: this.deprecationWarning('token.syncNFTContract', 'nft.syncNFTContract', this.nft.syncNFTContract),
  };

  public readonly defi = {
    getPairAddress: this.createFetcher(getPairAddressOperation),
    getPairReserves: this.createFetcher(getPairReservesOperation),
  };

  public readonly events = {
    getContractEvents: this.createPaginatedFetcher(getContractEventsOperation),
    getContractLogs: this.createPaginatedFetcher(getContractLogsOperation),
  };

  public readonly transaction = {
    getTransaction: this.createNullableFetcher(getTransactionOperation),
    getWalletTransactions: this.createPaginatedFetcher(getWalletTransactionsOperation),
  };

  public readonly balance = {
    getNativeBalance: this.createFetcher(getNativeBalanceOperation),
  };

  /**
   * @deprecated This property will be removed soon.
   */
  public readonly account = {
    /**
     * @deprecated Replaced by `balance.getNativeBalance()`.
     */
    getNativeBalance: this.deprecationWarning(
      'account.getNativeBalance',
      'balance.getNativeBalance',
      this.balance.getNativeBalance,
    ),
    /**
     * @deprecated Replaced by `nft.getWalletNFTs()`.
     */
    getNFTs: this.deprecationWarning('account.getNFTs', 'nft.getWalletNFTs', this.nft.getWalletNFTs),
    /**
     * @deprecated Replaced by `nft.getWalletNFTs()`. Same func as `getWalletNFTs()`.
     */
    getNFTsForContract: this.deprecationWarning(
      'account.getNFTsForContract',
      'nft.getWalletNFTs',
      this.nft.getWalletNFTs,
    ),
    /**
     * @deprecated Replaced by `nft.getWalletNFTTransfers()`.
     */
    getNFTTransfers: this.deprecationWarning(
      'account.getNFTTransfers',
      'nft.getWalletNFTTransfers',
      this.nft.getWalletNFTTransfers,
    ),
    /**
     * @deprecated Replaced by `token.getWalletTokenBalances()`.
     */
    getTokenBalances: this.deprecationWarning(
      'account.getTokenBalances',
      'token.getWalletTokenBalances',
      this.token.getWalletTokenBalances,
    ),
    /**
     * @deprecated Replaced by `token.getWalletTokenTransfers()`.
     */
    getTokenTransfers: this.deprecationWarning(
      'account.getTokenTransfers',
      'token.getWalletTokenTransfers',
      this.token.getWalletTokenTransfers,
    ),
    /**
     * @deprecated Replaced by `transaction.getWalletTransactions()`.
     */
    getTransactions: this.deprecationWarning(
      'account.getTransactions',
      'transaction.getWalletTransactions',
      this.transaction.getWalletTransactions,
    ),

    /**
     * @deprecated Replaced by `transaction.getWalletTransactions()`.
     */
    getWalletNFTCollections: this.deprecationWarning(
      'account.getWalletNFTCollections',
      'nft.getWalletNFTCollections',
      this.nft.getWalletNFTCollections,
    ),
  };

  public readonly block = {
    getBlock: this.createNullableFetcher(getBlockOperation),
    getDateToBlock: this.createFetcher(getDateToBlockOperation),
  };

  public readonly resolve = {
    resolveAddress: this.createNullableFetcher(resolveAddressOperation),
    resolveDomain: this.createNullableFetcher(resolveDomainOperation),
  };

  public readonly ipfs = {
    uploadFolder: this.createFetcher(uploadFolderOperation),
  };

  /**
   * @deprecated This property will be removed soon.
   */
  public readonly storage = {
    /**
     * @deprecated Replaced by `storage.uploadFolder()`.
     */
    uploadFolder: this.deprecationWarning('storage.uploadFolder', 'ipfs.uploadFolder', this.ipfs.uploadFolder),
  };

  private readonly _utils = {
    endpointWeights: this.createFetcher(endpointWeightsOperation),
    web3ApiVersion: this.createFetcher(web3ApiVersionOperation),
  };

  public readonly utils = {
    runContractFunction: this.createFetcher(runContractFunctionOperation),
    web3ApiVersion: () => this._utils.web3ApiVersion({}),
    endpointWeights: () => this._utils.endpointWeights({}),
  };

  /**
   * @deprecated This property will be removed soon.
   */
  public readonly native = {
    /**
     * @deprecated Replaced by `block.getDateToBlock()`.
     */
    getDateToBlock: this.deprecationWarning('native.getDateToBlock', 'block.getDateToBlock', this.block.getDateToBlock),
    /**
     * @deprecated Replaced by `block.getBlock()`.
     */
    getBlock: this.deprecationWarning('native.getBlock', 'block.getBlock', this.block.getBlock),
    /**
     * @deprecated Replaced by `events.getContractEvents()`.
     */
    getContractEvents: this.deprecationWarning(
      'native.getContractEvents',
      'events.getContractEvents',
      this.events.getContractEvents,
    ),
    /**
     * @deprecated Replaced by `events.getContractLogs()`.
     */
    getLogsByAddress: this.deprecationWarning(
      'native.getLogsByAddress',
      'events.getContractLogs',
      this.events.getContractLogs,
    ),
    /**
     * @deprecated Replaced by `nft.getNFTTransfersByBlock()`.
     */
    getNFTTransfersByBlock: this.deprecationWarning(
      'native.getNFTTransfersByBlock',
      'nft.getNFTTransfersByBlock',
      this.nft.getNFTTransfersByBlock,
    ),
    /**
     * @deprecated Replaced by `transaction.getTransaction()`.
     */
    getTransaction: this.deprecationWarning(
      'native.getTransaction',
      'transaction.getTransaction',
      this.transaction.getTransaction,
    ),
    /**
     * @deprecated Replaced by `utils.runContractFunction()`.
     */
    runContractFunction: this.deprecationWarning(
      'native.runContractFunction',
      'utils.runContractFunction',
      this.utils.runContractFunction,
    ),
  };

  /**
   * @deprecated This property will be removed soon.
   */
  public readonly info = {
    /**
     * @deprecated Replaced by `utils.endpointWeights()`.
     */
    endpointWeights: (_params?: unknown) =>
      this.deprecationWarning('info.endpointWeights', 'utils.endpointWeights', this._utils.endpointWeights)({}),
    /**
     * @deprecated Replaced by `utils.web3ApiVersion()`.
     */
    web3ApiVersion: (_params?: unknown) =>
      this.deprecationWarning('info.web3ApiVersion', 'utils.web3ApiVersion', this._utils.web3ApiVersion)({}),
  };

  private createFetcher<Request, JSONRequest, Response, JSONResponse>(
    operation: Operation<Request, JSONRequest, Response, JSONResponse>,
  ) {
    return new OperationResolver(operation, BASE_URL, this.core).fetch;
  }

  private createNullableFetcher<Request, JSONRequest, Response, JSONResponse>(
    operation: Operation<Request, JSONRequest, Response, JSONResponse>,
  ) {
    return new NullableOperationResolver(operation, BASE_URL, this.core).fetch;
  }

  private createPaginatedFetcher<Request extends PaginatedRequest, JSONRequest, Response, JSONResult>(
    operation: PaginatedOperation<Request, JSONRequest, Response, JSONResult>,
  ) {
    return new PaginatedOperationResolver(operation, BASE_URL, this.core).fetch;
  }

  private deprecationWarning<Params, Response>(
    oldName: string,
    newName: string,
    fetcher: Fetcher<Params, Response>,
  ): Fetcher<Params, Response> {
    return (params: Params) => {
      this.logger.warn(`${oldName}() is depreciated and will be removed soon. Please use ${newName}()`);
      return fetcher(params);
    };
  }
}

type Fetcher<Params, Response> = (params: Params) => Promise<Response>;
