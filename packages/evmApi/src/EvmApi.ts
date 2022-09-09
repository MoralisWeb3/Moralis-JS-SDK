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
    /** Get NFT transfers by block number or block hash. */
    getNFTTransfersByBlock: this.endpoints.createPaginatedFetcher(getNFTTransfersByBlock),
    /**
     * Get NFTs owned by a given address.
     * * The response will include status [SYNCED/SYNCING] based on the contracts being indexed.
     * * Use the token_address param to get results for a specific contract only
     * * Note results will include all indexed NFTs
     * * Any request which includes the token_address param will start the indexing process for that NFT collection the very first time it is requested.
     */
    getWalletNFTs: this.endpoints.createPaginatedFetcher(getWalletNFTs),
    /** Get the transfers of the tokens matching the given parameters. */
    getWalletNFTTransfers: this.endpoints.createPaginatedFetcher(getWalletNFTTransfers),
    /** Get the nft trades for a given contract and marketplace. */
    getNFTTrades: this.endpoints.createPaginatedFetcher(getNFTTrades),
    /** Get the lowest executed price for an NFT token contract for the last x days (only trades paid in ETH). */
    getNFTLowestPrice: this.endpoints.createNullableFetcher(getNFTLowestPrice),
    /** Get NFTs that match a given metadata search query. */
    searchNFTs: this.endpoints.createPaginatedFetcher(searchNFTs),
    /** Gets the transfers of the tokens from a block number to a block number. */
    getNFTTransfersFromToBlock: this.endpoints.createPaginatedFetcher(getNFTTransfersFromToBlock),
    /**
     * Get all NFTs, including metadata (where available), for all NFTs for the given contract address.
     * * Results are limited to 100 per page by default
     * * Requests for contract addresses not yet indexed will automatically start the indexing process for that NFT collection.
     */
    getContractNFTs: this.endpoints.createPaginatedFetcher(getContractNFTs),
    /**
     * Get all owners of NFTs within a given contract.
     * * Requests for contract addresses not yet indexed will automatically start the indexing process for that NFT collection.
     */
    getNFTOwners: this.endpoints.createPaginatedFetcher(getNFTOwners),
    /**
     * Get the contract level metadata (name, symbol, base token uri) for the given contract
     * * Requests for contract addresses not yet indexed will automatically start the indexing process for that NFT collection
     */
    getNFTContractMetadata: this.endpoints.createNullableFetcher(getNFTContractMetadata),
    /**
     * ReSync the metadata for an NFT
     * * The metadata flag will request a the NFT's metadata from the already existing token_uri
     * * The uri(default) flag will fetch the latest token_uri from the given NFT address. In sync mode the metadata will also be fetched
     * * The sync mode will make the endpoint synchronous so it will wait for the task to be completed before responding
     * * The async mode(default) will make the endpoint asynchronous so we will wait for the task to be completed before responding
     */
    reSyncMetadata: this.endpoints.createFetcher(reSyncMetadata),
    /**
     * Get NFT data, including metadata (where available), for the given NFT token id of the given contract address.
     * * Requests for contract addresses not yet indexed will automatically start the indexing process for that NFT collection
     */
    getNFTMetadata: this.endpoints.createNullableFetcher(getNFTMetadata),
    /**
     * Get all owners of a specific NFT given the contract address and token ID.
     * * Requests for contract addresses not yet indexed will automatically start the indexing process for that NFT collection
     */
    getNFTTokenIdOwners: this.endpoints.createPaginatedFetcher(getNFTTokenIdOwners),
    /** Get the transfers of an NFT given a conttract address and token ID. */
    getNFTTransfers: this.endpoints.createPaginatedFetcher(getNFTTransfers),
    /** Initiates a metadata refresh for an entire NFT collection. */
    syncNFTContract: this.endpoints.createFetcher(syncNFTContract),
    /** Get the transfers of the tokens matching the given parameters. */
    getNFTContractTransfers: this.endpoints.createPaginatedFetcher(getNFTContractTransfers),
    /** Get the nft collections owned by an user */
    getWalletNFTCollections: this.endpoints.createPaginatedFetcher(getWalletNFTCollections),
  };

  private readonly _token = {
    getTokenTransfers: this.endpoints.createPaginatedFetcher(getTokenTransfers),
  };

  public readonly token = {
    /** Get token balances for a specific address. */
    getWalletTokenBalances: this.endpoints.createFetcher(getWalletTokenBalances),
    /** Get ERC20 token transactions ordered by block number in descending order. */
    getWalletTokenTransfers: this.endpoints.createPaginatedFetcher(getWalletTokenTransfers),
    /** Returns metadata (name, symbol, decimals, logo) for a given token contract address. */
    getTokenMetadata: this.endpoints.createFetcher(getTokenMetadata),
    /** Get metadata (name, symbol, decimals, logo) for a list of token symbols. */
    getTokenMetadataBySymbol: this.endpoints.createFetcher(getTokenMetadataBySymbol),
    /** Get the token price denominated in the blockchains native token and USD. */
    getTokenPrice: this.endpoints.createFetcher(getTokenPrice),
    /** Get ERC20 token transactions ordered by block number in descending order. */
    getTokenTransfers: this._token.getTokenTransfers,
    /** Get the amount which the spender is allowed to withdraw on behalf of the owner. */
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
    /**
     * Fetch the pair data of the provided token0+token1 combination.
     * The token0 and token1 options are interchangable (ie. there is no different outcome in "token0=WETH and token1=USDT" or "token0=USDT and token1=WETH")
     */
    getPairAddress: this.endpoints.createFetcher(getPairAddress),
    /** Get the liquidity reserves for a given pair address. Only Uniswap V2 based exchanges supported at the moment. */
    getPairReserves: this.endpoints.createFetcher(getPairReserves),
  };

  public readonly events = {
    /** Get events for a specific contract ordered by block number in descending order. */
    getContractEvents: this.endpoints.createPaginatedFetcher(getContractEvents),
    /** Get the logs for an address. */
    getContractLogs: this.endpoints.createPaginatedFetcher(getContractLogs),
  };

  public readonly transaction = {
    /** Get the contents of a transaction by transaction hash. */
    getTransaction: this.endpoints.createNullableFetcher(getTransaction),
    /** Get native transactions ordered by block number in descending order. */
    getWalletTransactions: this.endpoints.createPaginatedFetcher(getWalletTransactions),
  };

  public readonly balance = {
    /** Get native balance for a specific address. */
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
    /** Get the contents of a block by block hash. */
    getBlock: this.endpoints.createNullableFetcher(getBlock),
    /** Get the closest block of the provided date. */
    getDateToBlock: this.endpoints.createFetcher(getDateToBlock),
  };

  public readonly resolve = {
    /** Resolve an ETH address and find the ENS name. */
    resolveAddress: this.endpoints.createNullableFetcher(resolveAddress),
    /** Resolve an Unstoppable domain and get the address. */
    resolveDomain: this.endpoints.createNullableFetcher(resolveDomain),
  };

  public readonly ipfs = {
    /** Upload multiple files to IPFS and place them in a folder directory. */
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
    /** Run a given function of a contract abi and retrieve readonly data. */
    runContractFunction: this.endpoints.createFetcher(runContractFunction),
    /** Get the current version of the Moralis Web3 API. */
    web3ApiVersion: () => this._utils.web3ApiVersion({}),
    /** Get the endpoint price list for rate limits and cost. */
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
