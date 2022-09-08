import { ApiModule, MoralisCore, MoralisCoreProvider } from '@moralisweb3/core';
import {
  getTokenAllowance,
  getTokenMetadata,
  getTokenMetadataBySymbol,
  getTokenPrice,
  getTokenTransfers,
  getWalletTokenBalances,
  getWalletTokenTransfers,
} from './resolvers/token';
import { getPairAddress, getPairReserves } from './resolvers/defi';
import { resolveAddress, resolveDomain } from './resolvers/resolve';
import { getBlock, getDateToBlock } from './resolvers/native';
import { uploadFolder } from './resolvers/ipfs';
import { EvmApiConfigSetup } from './config/EvmApiConfigSetup';
import { Endpoints } from '@moralisweb3/api-utils';
import { endpointWeights, runContractFunction, web3ApiVersion } from './resolvers/utils';
import {
  getContractNFTs,
  getNFTContractMetadata,
  getNFTContractTransfers,
  getNFTLowestPrice,
  getNFTMetadata,
  getNFTOwners,
  getNFTTokenIdOwners,
  getNFTTrades,
  getNFTTransfers,
  getNFTTransfersByBlock,
  getNFTTransfersFromToBlock,
  getWalletNFTs,
  getWalletNFTCollections,
  getWalletNFTTransfers,
  reSyncMetadata,
  searchNFTs,
  syncNFTContract,
} from './resolvers/nft';
import { getContractEvents, getContractLogs } from './resolvers/events';
import { getTransaction, getWalletTransactions } from './resolvers/transaction';
import { getNativeBalance } from './resolvers/balance';

const BASE_URL = 'https://deep-index.moralis.io/api/v2';

export class MoralisEvmApi extends ApiModule {
  public static readonly moduleName = 'evmApi';

  public static create(core?: MoralisCore): MoralisEvmApi {
    return new MoralisEvmApi(core ?? MoralisCoreProvider.getDefault());
  }

  private constructor(core: MoralisCore) {
    super(MoralisEvmApi.moduleName, core, BASE_URL);
  }

  public setup() {
    EvmApiConfigSetup.register(this.core.config);
  }

  public start() {
    // Nothing
  }

  public readonly endpoints = new Endpoints(this.core, BASE_URL);

  public readonly nft = {
    getNFTTransfersByBlock: this.endpoints.createPaginatedFetcher(getNFTTransfersByBlock),
    getWalletNFTs: this.endpoints.createPaginatedFetcher(getWalletNFTs),
    getWalletNFTTransfers: this.endpoints.createPaginatedFetcher(getWalletNFTTransfers),
    getNFTTrades: this.endpoints.createPaginatedFetcher(getNFTTrades),
    getNFTLowestPrice: this.endpoints.createNullableFetcher(getNFTLowestPrice),
    searchNFTs: this.endpoints.createPaginatedFetcher(searchNFTs),
    getNFTTransfersFromToBlock: this.endpoints.createPaginatedFetcher(getNFTTransfersFromToBlock),
    getContractNFTs: this.endpoints.createPaginatedFetcher(getContractNFTs),
    getNFTOwners: this.endpoints.createPaginatedFetcher(getNFTOwners),
    getNFTContractMetadata: this.endpoints.createNullableFetcher(getNFTContractMetadata),
    reSyncMetadata: this.endpoints.createFetcher(reSyncMetadata),
    getNFTMetadata: this.endpoints.createNullableFetcher(getNFTMetadata),
    getNFTTokenIdOwners: this.endpoints.createPaginatedFetcher(getNFTTokenIdOwners),
    getNFTTransfers: this.endpoints.createPaginatedFetcher(getNFTTransfers),
    syncNFTContract: this.endpoints.createFetcher(syncNFTContract),
    getNFTContractTransfers: this.endpoints.createPaginatedFetcher(getNFTContractTransfers),
    getWalletNFTCollections: this.endpoints.createPaginatedFetcher(getWalletNFTCollections),
  };

  private readonly _token = {
    getTokenTransfers: this.endpoints.createPaginatedFetcher(getTokenTransfers),
  };

  public readonly token = {
    getWalletTokenBalances: this.endpoints.createFetcher(getWalletTokenBalances),
    getWalletTokenTransfers: this.endpoints.createPaginatedFetcher(getWalletTokenTransfers),
    getTokenMetadata: this.endpoints.createFetcher(getTokenMetadata),
    getTokenMetadataBySymbol: this.endpoints.createFetcher(getTokenMetadataBySymbol),
    getTokenPrice: this.endpoints.createFetcher(getTokenPrice),
    getTokenTransfers: this._token.getTokenTransfers,
    getTokenAllowance: this.endpoints.createFetcher(getTokenAllowance),

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
    getPairAddress: this.endpoints.createFetcher(getPairAddress),
    getPairReserves: this.endpoints.createFetcher(getPairReserves),
  };

  public readonly events = {
    getContractEvents: this.endpoints.createPaginatedFetcher(getContractEvents),
    getContractLogs: this.endpoints.createPaginatedFetcher(getContractLogs),
  };

  public readonly transaction = {
    getTransaction: this.endpoints.createNullableFetcher(getTransaction),
    getWalletTransactions: this.endpoints.createPaginatedFetcher(getWalletTransactions),
  };

  public readonly balance = {
    getNativeBalance: this.endpoints.createFetcher(getNativeBalance),
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
    getBlock: this.endpoints.createNullableFetcher(getBlock),
    getDateToBlock: this.endpoints.createFetcher(getDateToBlock),
  };

  public readonly resolve = {
    resolveAddress: this.endpoints.createNullableFetcher(resolveAddress),
    resolveDomain: this.endpoints.createNullableFetcher(resolveDomain),
  };

  public readonly ipfs = {
    uploadFolder: this.endpoints.createFetcher(uploadFolder),
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
    endpointWeights: this.endpoints.createFetcher(endpointWeights),
    web3ApiVersion: this.endpoints.createFetcher(web3ApiVersion),
  };

  public readonly utils = {
    runContractFunction: this.endpoints.createFetcher(runContractFunction),
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
