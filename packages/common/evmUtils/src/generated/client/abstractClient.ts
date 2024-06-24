import { GetNFTTradesOperation, GetNFTTradesOperationRequest, GetNFTTradesOperationRequestJSON } from '../operations/GetNFTTradesOperation';
import { EvmTradeCollection, EvmTradeCollectionJSON } from '../types/EvmTradeCollection';
import { GetNFTContractSalePricesOperation, GetNFTContractSalePricesOperationRequest, GetNFTContractSalePricesOperationRequestJSON } from '../operations/GetNFTContractSalePricesOperation';
import { EvmSoldPrice, EvmSoldPriceJSON } from '../types/EvmSoldPrice';
import { GetNFTSalePricesOperation, GetNFTSalePricesOperationRequest, GetNFTSalePricesOperationRequestJSON } from '../operations/GetNFTSalePricesOperation';
import { GetMultipleTokenPricesOperation, GetMultipleTokenPricesOperationRequest, GetMultipleTokenPricesOperationRequestJSON } from '../operations/GetMultipleTokenPricesOperation';
import { EvmErc20Price, EvmErc20PriceJSON } from '../types/EvmErc20Price';
import { EvmGetMultipleTokenPricesDto, EvmGetMultipleTokenPricesDtoInput, EvmGetMultipleTokenPricesDtoJSON } from '../types/EvmGetMultipleTokenPricesDto';
import { GetTokenOwnersOperation, GetTokenOwnersOperationRequest, GetTokenOwnersOperationRequestJSON } from '../operations/GetTokenOwnersOperation';
import { EvmErc20TokenOwnerCollection, EvmErc20TokenOwnerCollectionJSON } from '../types/EvmErc20TokenOwnerCollection';
import { GetWalletHistoryOperation, GetWalletHistoryOperationRequest, GetWalletHistoryOperationRequestJSON } from '../operations/GetWalletHistoryOperation';
import { EvmWalletHistory, EvmWalletHistoryJSON } from '../types/EvmWalletHistory';
import { GetWalletTokenBalancesPriceOperation, GetWalletTokenBalancesPriceOperationRequest, GetWalletTokenBalancesPriceOperationRequestJSON } from '../operations/GetWalletTokenBalancesPriceOperation';
import { EvmErc20TokenBalanceWithPriceResult, EvmErc20TokenBalanceWithPriceResultJSON } from '../types/EvmErc20TokenBalanceWithPriceResult';
import { GetWalletNetWorthOperation, GetWalletNetWorthOperationRequest, GetWalletNetWorthOperationRequestJSON } from '../operations/GetWalletNetWorthOperation';
import { EvmNetWorthResult, EvmNetWorthResultJSON } from '../types/EvmNetWorthResult';
import { Web3ApiVersionOperation, Web3ApiVersionOperationRequest, Web3ApiVersionOperationRequestJSON } from '../operations/Web3ApiVersionOperation';
import { EvmWeb3version, EvmWeb3versionJSON } from '../types/EvmWeb3version';
import { EndpointWeightsOperation, EndpointWeightsOperationRequest, EndpointWeightsOperationRequestJSON } from '../operations/EndpointWeightsOperation';
import { EvmEndpointWeights, EvmEndpointWeightsJSON } from '../types/EvmEndpointWeights';
import { ResolveAddressToDomainOperation, ResolveAddressToDomainOperationRequest, ResolveAddressToDomainOperationRequestJSON } from '../operations/ResolveAddressToDomainOperation';
import { EvmUnstoppableDomain, EvmUnstoppableDomainJSON } from '../types/EvmUnstoppableDomain';
import { GetPairPriceOperation, GetPairPriceOperationRequest, GetPairPriceOperationRequestJSON } from '../operations/GetPairPriceOperation';
import { EvmGetPairPrice, EvmGetPairPriceJSON } from '../types/EvmGetPairPrice';
import { GetTopERC20TokensByMarketCapOperation, GetTopERC20TokensByMarketCapOperationRequest, GetTopERC20TokensByMarketCapOperationRequestJSON } from '../operations/GetTopERC20TokensByMarketCapOperation';
import { EvmMarketDataERC20TokenItem, EvmMarketDataERC20TokenItemJSON } from '../types/EvmMarketDataERC20TokenItem';
import { GetTopERC20TokensByPriceMoversOperation, GetTopERC20TokensByPriceMoversOperationRequest, GetTopERC20TokensByPriceMoversOperationRequestJSON } from '../operations/GetTopERC20TokensByPriceMoversOperation';
import { EvmMarketDataERC20TokensByPriceMovers, EvmMarketDataERC20TokensByPriceMoversJSON } from '../types/EvmMarketDataERC20TokensByPriceMovers';
import { GetTopNFTCollectionsByMarketCapOperation, GetTopNFTCollectionsByMarketCapOperationRequest, GetTopNFTCollectionsByMarketCapOperationRequestJSON } from '../operations/GetTopNFTCollectionsByMarketCapOperation';
import { EvmMarketDataTopNFTCollectionByMarketCapItem, EvmMarketDataTopNFTCollectionByMarketCapItemJSON } from '../types/EvmMarketDataTopNFTCollectionByMarketCapItem';
import { GetHottestNFTCollectionsByTradingVolumeOperation, GetHottestNFTCollectionsByTradingVolumeOperationRequest, GetHottestNFTCollectionsByTradingVolumeOperationRequestJSON } from '../operations/GetHottestNFTCollectionsByTradingVolumeOperation';
import { EvmMarketDataHottestNFTCollectionByTradingVolumeItem, EvmMarketDataHottestNFTCollectionByTradingVolumeItemJSON } from '../types/EvmMarketDataHottestNFTCollectionByTradingVolumeItem';
import { GetTopCryptoCurrenciesByMarketCapOperation, GetTopCryptoCurrenciesByMarketCapOperationRequest, GetTopCryptoCurrenciesByMarketCapOperationRequestJSON } from '../operations/GetTopCryptoCurrenciesByMarketCapOperation';
import { EvmMarketDataTopCryptoCurrenciesByMarketCapItem, EvmMarketDataTopCryptoCurrenciesByMarketCapItemJSON } from '../types/EvmMarketDataTopCryptoCurrenciesByMarketCapItem';
import { GetTopCryptoCurrenciesByTradingVolumeOperation, GetTopCryptoCurrenciesByTradingVolumeOperationRequest, GetTopCryptoCurrenciesByTradingVolumeOperationRequestJSON } from '../operations/GetTopCryptoCurrenciesByTradingVolumeOperation';
import { ReviewContractsOperation, ReviewContractsOperationRequest, ReviewContractsOperationRequestJSON } from '../operations/ReviewContractsOperation';
import { EvmReviewContracts, EvmReviewContractsJSON } from '../types/EvmReviewContracts';
import { EvmContractsReviewDto, EvmContractsReviewDtoInput, EvmContractsReviewDtoJSON } from '../types/EvmContractsReviewDto';
import { GetDefiSummaryOperation, GetDefiSummaryOperationRequest, GetDefiSummaryOperationRequestJSON } from '../operations/GetDefiSummaryOperation';
import { EvmWalletDefiSummary, EvmWalletDefiSummaryJSON } from '../types/EvmWalletDefiSummary';
import { GetDefiPositionsByProtocolOperation, GetDefiPositionsByProtocolOperationRequest, GetDefiPositionsByProtocolOperationRequestJSON } from '../operations/GetDefiPositionsByProtocolOperation';
import { EvmGetDefiPositionsByProtocol, EvmGetDefiPositionsByProtocolJSON } from '../types/EvmGetDefiPositionsByProtocol';
import { GetDefiPositionsSummaryOperation, GetDefiPositionsSummaryOperationRequest, GetDefiPositionsSummaryOperationRequestJSON } from '../operations/GetDefiPositionsSummaryOperation';
import { EvmDefiPositionSummaryResponse, EvmDefiPositionSummaryResponseJSON } from '../types/EvmDefiPositionSummaryResponse';
import { GetWalletActiveChainsOperation, GetWalletActiveChainsOperationRequest, GetWalletActiveChainsOperationRequestJSON } from '../operations/GetWalletActiveChainsOperation';
import { EvmWalletActiveChains, EvmWalletActiveChainsJSON } from '../types/EvmWalletActiveChains';
import { GetWalletStatsOperation, GetWalletStatsOperationRequest, GetWalletStatsOperationRequestJSON } from '../operations/GetWalletStatsOperation';
import { EvmWalletStat, EvmWalletStatJSON } from '../types/EvmWalletStat';
import { GetNFTCollectionStatsOperation, GetNFTCollectionStatsOperationRequest, GetNFTCollectionStatsOperationRequestJSON } from '../operations/GetNFTCollectionStatsOperation';
import { EvmNftCollectionStat, EvmNftCollectionStatJSON } from '../types/EvmNftCollectionStat';
import { GetNFTTokenStatsOperation, GetNFTTokenStatsOperationRequest, GetNFTTokenStatsOperationRequestJSON } from '../operations/GetNFTTokenStatsOperation';
import { EvmNftTokenStat, EvmNftTokenStatJSON } from '../types/EvmNftTokenStat';
import { GetTokenStatsOperation, GetTokenStatsOperationRequest, GetTokenStatsOperationRequestJSON } from '../operations/GetTokenStatsOperation';
import { EvmErc20TokenStat, EvmErc20TokenStatJSON } from '../types/EvmErc20TokenStat';
import { GetBlockStatsOperation, GetBlockStatsOperationRequest, GetBlockStatsOperationRequestJSON } from '../operations/GetBlockStatsOperation';
import { EvmBlockTokenStat, EvmBlockTokenStatJSON } from '../types/EvmBlockTokenStat';
import { GetWalletProfitabilitySummaryOperation, GetWalletProfitabilitySummaryOperationRequest, GetWalletProfitabilitySummaryOperationRequestJSON } from '../operations/GetWalletProfitabilitySummaryOperation';
import { EvmGetWalletProfitabilitySummary, EvmGetWalletProfitabilitySummaryJSON } from '../types/EvmGetWalletProfitabilitySummary';
import { GetWalletProfitabilityOperation, GetWalletProfitabilityOperationRequest, GetWalletProfitabilityOperationRequestJSON } from '../operations/GetWalletProfitabilityOperation';
import { EvmWalletProfitabilityResponse, EvmWalletProfitabilityResponseJSON } from '../types/EvmWalletProfitabilityResponse';
import { GetTopProfitableWalletPerTokenOperation, GetTopProfitableWalletPerTokenOperationRequest, GetTopProfitableWalletPerTokenOperationRequestJSON } from '../operations/GetTopProfitableWalletPerTokenOperation';
import { EvmWalletTopProfitableWalletPerTokenResponse, EvmWalletTopProfitableWalletPerTokenResponseJSON } from '../types/EvmWalletTopProfitableWalletPerTokenResponse';

export interface OperationV3<Request, RequestJSON, Response, ResponseJSON, Body, BodyJSON> {
  operationId: string;
  groupName: string;
  httpMethod: string;
  routePattern: string;
  parameterNames: string[];
  hasResponse: boolean;
  hasBody: boolean;
  serializeRequest?: (request: Request) => RequestJSON;
  parseResponse?: (json: ResponseJSON) => Response;
  serializeBody?: (body: Body) => BodyJSON;
}

export abstract class AbstractClient {
  protected abstract createEndpoint<Request, RequestJSON, Response, ResponseJSON>(
    operation: OperationV3<Request, RequestJSON, Response, ResponseJSON, null, null>
  ): (request: Request) => Promise<Response>;
  protected abstract createEndpointWithBody<Request, RequestJSON, Response, ResponseJSON, Body, BodyJSON>(
    operation: OperationV3<Request, RequestJSON, Response, ResponseJSON, Body, BodyJSON>
  ): (request: Request, body: Body) => Promise<Response>;

  public readonly block = {
    /**
     * @description Get the stats for a block
     * @param request Request with parameters.
     * @param {String} request.blockNumberOrHash The block number or hash
     * @param {Object} [request.chain] The chain to query (optional)
     * @returns {Object} Response for the request.
     */
    getBlockStats: this.createEndpoint<
      GetBlockStatsOperationRequest,
      GetBlockStatsOperationRequestJSON,
      EvmBlockTokenStat,
      EvmBlockTokenStatJSON
    >(GetBlockStatsOperation),
  };
  public readonly defi = {
    /**
     * @description Get the price of a given token pair. Only Uniswap V2 based exchanges supported at the moment.
     * @param request Request with parameters.
     * @param {Object} request.token0Address The token0 address
     * @param {Object} request.token1Address The token1 address
     * @param {Object} [request.chain] The chain to query (optional)
     * @param {Number} [request.toBlock] The block number to get the reserves from (optional)
     * @param {Date} [request.toDate] Get the price up to this date (format in seconds or datestring accepted by momentjs)
     * * Provide the param 'to_block' or 'to_date'
     * * If 'to_date' and 'to_block' are provided, 'to_block' will be used. (optional)
     * @param {String} [request.exchange] The factory name or address of the token exchange (optional)
     * @returns {Object} Response for the request.
     */
    getPairPrice: this.createEndpoint<
      GetPairPriceOperationRequest,
      GetPairPriceOperationRequestJSON,
      EvmGetPairPrice,
      EvmGetPairPriceJSON
    >(GetPairPriceOperation),
  };
  public readonly marketData = {
    /**
     * @description Get the top ERC20 tokens by market cap
     * @param request Request with parameters.
     * @returns {Object[]} Response for the request.
     */
    getTopERC20TokensByMarketCap: this.createEndpoint<
      GetTopERC20TokensByMarketCapOperationRequest,
      GetTopERC20TokensByMarketCapOperationRequestJSON,
      EvmMarketDataERC20TokenItem[],
      EvmMarketDataERC20TokenItemJSON[]
    >(GetTopERC20TokensByMarketCapOperation),
    /**
     * @description Get the top ERC20 tokens by price change
     * @param request Request with parameters.
     * @returns {Object} Response for the request.
     */
    getTopERC20TokensByPriceMovers: this.createEndpoint<
      GetTopERC20TokensByPriceMoversOperationRequest,
      GetTopERC20TokensByPriceMoversOperationRequestJSON,
      EvmMarketDataERC20TokensByPriceMovers,
      EvmMarketDataERC20TokensByPriceMoversJSON
    >(GetTopERC20TokensByPriceMoversOperation),
    /**
     * @description Get the top NFT collections by market cap
     * @param request Request with parameters.
     * @returns {Object[]} Response for the request.
     */
    getTopNFTCollectionsByMarketCap: this.createEndpoint<
      GetTopNFTCollectionsByMarketCapOperationRequest,
      GetTopNFTCollectionsByMarketCapOperationRequestJSON,
      EvmMarketDataTopNFTCollectionByMarketCapItem[],
      EvmMarketDataTopNFTCollectionByMarketCapItemJSON[]
    >(GetTopNFTCollectionsByMarketCapOperation),
    /**
     * @description Get the hottest NFT collections by trading volume
     * @param request Request with parameters.
     * @returns {Object[]} Response for the request.
     */
    getHottestNFTCollectionsByTradingVolume: this.createEndpoint<
      GetHottestNFTCollectionsByTradingVolumeOperationRequest,
      GetHottestNFTCollectionsByTradingVolumeOperationRequestJSON,
      EvmMarketDataHottestNFTCollectionByTradingVolumeItem[],
      EvmMarketDataHottestNFTCollectionByTradingVolumeItemJSON[]
    >(GetHottestNFTCollectionsByTradingVolumeOperation),
    /**
     * @description Get the top crypto currencies by market cap
     * @param request Request with parameters.
     * @returns {Object[]} Response for the request.
     */
    getTopCryptoCurrenciesByMarketCap: this.createEndpoint<
      GetTopCryptoCurrenciesByMarketCapOperationRequest,
      GetTopCryptoCurrenciesByMarketCapOperationRequestJSON,
      EvmMarketDataTopCryptoCurrenciesByMarketCapItem[],
      EvmMarketDataTopCryptoCurrenciesByMarketCapItemJSON[]
    >(GetTopCryptoCurrenciesByMarketCapOperation),
    /**
     * @description Get the top crypto currencies by trading volume
     * @param request Request with parameters.
     * @returns {Object[]} Response for the request.
     */
    getTopCryptoCurrenciesByTradingVolume: this.createEndpoint<
      GetTopCryptoCurrenciesByTradingVolumeOperationRequest,
      GetTopCryptoCurrenciesByTradingVolumeOperationRequestJSON,
      EvmMarketDataTopCryptoCurrenciesByMarketCapItem[],
      EvmMarketDataTopCryptoCurrenciesByMarketCapItemJSON[]
    >(GetTopCryptoCurrenciesByTradingVolumeOperation),
  };
  public readonly nft = {
    /**
     * @description Get trades of NFTs for a given contract with the ability to filter by marketplace.
     * @param request Request with parameters.
     * @param {Object} request.address The address of the NFT contract
     * @param {Object} [request.chain] The chain to query (optional)
     * @param {Number} [request.fromBlock] The minimum block number from which to get the transfers
     * * Provide the param 'from_block' or 'from_date'
     * * If 'from_date' and 'from_block' are provided, 'from_block' will be used. (optional)
     * @param {Number} [request.toBlock] The block number to get the trades from (optional)
     * @param {String} [request.fromDate] The start date from which to get the transfers (format in seconds or datestring accepted by momentjs)
     * * Provide the param 'from_block' or 'from_date'
     * * If 'from_date' and 'from_block' are provided, 'from_block' will be used. (optional)
     * @param {Date} [request.toDate] The end date from which to get the transfers (format in seconds or datestring accepted by momentjs)
     * * Provide the param 'to_block' or 'to_date'
     * * If 'to_date' and 'to_block' are provided, 'to_block' will be used. (optional)
     * @param {Object} [request.marketplace] Marketplace from which to get the trades. See [supported Marketplaces](https://docs.moralis.io/web3-data-api/evm/nft-marketplaces). (optional)
     * @param {String} [request.cursor] The cursor returned in the previous response (used for getting the next page). (optional)
     * @param {Number} [request.limit] The desired page size of the result. (optional)
     * @param {Boolean} [request.nftMetadata] Include the NFT Metadata of the NFT Token (optional)
     * @returns {Object} Response for the request.
     */
    getNFTTrades: this.createEndpoint<
      GetNFTTradesOperationRequest,
      GetNFTTradesOperationRequestJSON,
      EvmTradeCollection,
      EvmTradeCollectionJSON
    >(GetNFTTradesOperation),
    /**
     * @description Get the sold price for an NFT contract for the last x days (only trades paid in ETH).
     * @param request Request with parameters.
     * @param {Object} request.address The address of the NFT collection
     * @param {Object} [request.chain] The chain to query (optional)
     * @param {Number} [request.days] The number of days to look back to find the lowest price
     * If not provided 7 days will be the default and 365 is the maximum (optional)
     * @returns {Object} Response for the request.
     */
    getNFTContractSalePrices: this.createEndpoint<
      GetNFTContractSalePricesOperationRequest,
      GetNFTContractSalePricesOperationRequestJSON,
      EvmSoldPrice,
      EvmSoldPriceJSON
    >(GetNFTContractSalePricesOperation),
    /**
     * @description Get the sold price for an NFT token for the last x days (only trades paid in ETH).
     * @param request Request with parameters.
     * @param {Object} request.address The address of the NFT collection
     * @param {String} request.tokenId The token id of the NFT collection
     * @param {Object} [request.chain] The chain to query (optional)
     * @param {Number} [request.days] The number of days to look back to find the lowest price
     * If not provided 7 days will be the default and 365 is the maximum (optional)
     * @returns {Object} Response for the request.
     */
    getNFTSalePrices: this.createEndpoint<
      GetNFTSalePricesOperationRequest,
      GetNFTSalePricesOperationRequestJSON,
      EvmSoldPrice,
      EvmSoldPriceJSON
    >(GetNFTSalePricesOperation),
    /**
     * @description Get the stats for a nft collection address.
     * @param request Request with parameters.
     * @param {Object} request.address The address of the NFT collection
     * @param {Object} [request.chain] The chain to query (optional)
     * @returns {Object} Response for the request.
     */
    getNFTCollectionStats: this.createEndpoint<
      GetNFTCollectionStatsOperationRequest,
      GetNFTCollectionStatsOperationRequestJSON,
      EvmNftCollectionStat,
      EvmNftCollectionStatJSON
    >(GetNFTCollectionStatsOperation),
    /**
     * @description Get the stats for a nft token
     * @param request Request with parameters.
     * @param {Object} request.address The address of the NFT collection
     * @param {String} request.tokenId The token id of the NFT collection
     * @param {Object} [request.chain] The chain to query (optional)
     * @returns {Object} Response for the request.
     */
    getNFTTokenStats: this.createEndpoint<
      GetNFTTokenStatsOperationRequest,
      GetNFTTokenStatsOperationRequestJSON,
      EvmNftTokenStat,
      EvmNftTokenStatJSON
    >(GetNFTTokenStatsOperation),
  };
  public readonly resolve = {
    /**
     * @description Resolve a specific address to its Unstoppable domain
     * @param request Request with parameters.
     * @param {Object} request.address The address to be resolved
     * @param {Object} [request.currency] The currency to query (optional)
     * @returns {Object} Response for the request.
     */
    resolveAddressToDomain: this.createEndpoint<
      ResolveAddressToDomainOperationRequest,
      ResolveAddressToDomainOperationRequestJSON,
      EvmUnstoppableDomain,
      EvmUnstoppableDomainJSON
    >(ResolveAddressToDomainOperation),
  };
  public readonly token = {
    /**
     * @description Returns an array of token prices denominated in the blockchain's native token and USD for a given token contract address
     * @param request Request with parameters.
     * @param {Object} [request.chain] The chain to query (optional)
     * @param {Object} [request.include] If the result should contain the 24hr percent change (optional)
     * @param body Request body.
     * @param {Object[]} body.tokens The tokens to be fetched
     * @returns {Object[]} Response for the request.
     */
    getMultipleTokenPrices: this.createEndpointWithBody<
      GetMultipleTokenPricesOperationRequest,
      GetMultipleTokenPricesOperationRequestJSON,
      EvmErc20Price[],
      EvmErc20PriceJSON[],
      EvmGetMultipleTokenPricesDtoInput | EvmGetMultipleTokenPricesDto,
      EvmGetMultipleTokenPricesDtoJSON
    >(GetMultipleTokenPricesOperation),
    /**
     * @description Identify the major holders of an ERC20 token and understand their ownership percentages
     * @param request Request with parameters.
     * @param {String} request.tokenAddress The address of the token contract
     * @param {Object} [request.chain] The chain to query (optional)
     * @param {Number} [request.limit] The desired page size of the result. (optional)
     * @param {String} [request.cursor] The cursor returned in the previous response (used for getting the next page). (optional)
     * @param {Object} [request.order] The order of the result, in ascending (ASC) or descending (DESC) (optional)
     * @returns {Object} Response for the request.
     */
    getTokenOwners: this.createEndpoint<
      GetTokenOwnersOperationRequest,
      GetTokenOwnersOperationRequestJSON,
      EvmErc20TokenOwnerCollection,
      EvmErc20TokenOwnerCollectionJSON
    >(GetTokenOwnersOperation),
    /**
     * @description Get the stats for a erc20 token
     * @param request Request with parameters.
     * @param {Object} request.address The address of the erc20 token
     * @param {Object} [request.chain] The chain to query (optional)
     * @returns {Object} Response for the request.
     */
    getTokenStats: this.createEndpoint<
      GetTokenStatsOperationRequest,
      GetTokenStatsOperationRequestJSON,
      EvmErc20TokenStat,
      EvmErc20TokenStatJSON
    >(GetTokenStatsOperation),
    /**
     * @description Retrieves a list of the top profitable wallets for a specific ERC20 token.
     * @param request Request with parameters.
     * @param {Object} request.address The ERC20 token address.
     * @param {String} [request.days] Timeframe in days for which profitability is calculated, can be 'all', '7d' or '30d' (optional)
     * @param {Object} [request.chain] The chain to query (optional)
     * @returns {Object} Response for the request.
     */
    getTopProfitableWalletPerToken: this.createEndpoint<
      GetTopProfitableWalletPerTokenOperationRequest,
      GetTopProfitableWalletPerTokenOperationRequestJSON,
      EvmWalletTopProfitableWalletPerTokenResponse,
      EvmWalletTopProfitableWalletPerTokenResponseJSON
    >(GetTopProfitableWalletPerTokenOperation),
  };
  public readonly utils = {
    /**
     * @description Get the current version of the Moralis Web3 API.
     * @param request Request with parameters.
     * @returns {Object} Response for the request.
     */
    web3ApiVersion: this.createEndpoint<
      Web3ApiVersionOperationRequest,
      Web3ApiVersionOperationRequestJSON,
      EvmWeb3version,
      EvmWeb3versionJSON
    >(Web3ApiVersionOperation),
    /**
     * @description Get the cost and rate limit for each API endpoint.
     * @param request Request with parameters.
     * @returns {Object[]} Response for the request.
     */
    endpointWeights: this.createEndpoint<
      EndpointWeightsOperationRequest,
      EndpointWeightsOperationRequestJSON,
      EvmEndpointWeights[],
      EvmEndpointWeightsJSON[]
    >(EndpointWeightsOperation),
    /**
     * @description Review contracts as spam or not spam
     * @param request Request with parameters.
     * @param {Object} [request.chain] The chain to query (optional)
     * @param body Request body.
     * @param {Object[]} body.contracts The contracts to be reported
     * @returns {Object} Response for the request.
     */
    reviewContracts: this.createEndpointWithBody<
      ReviewContractsOperationRequest,
      ReviewContractsOperationRequestJSON,
      EvmReviewContracts,
      EvmReviewContractsJSON,
      EvmContractsReviewDtoInput | EvmContractsReviewDto,
      EvmContractsReviewDtoJSON
    >(ReviewContractsOperation),
  };
  public readonly wallets = {
    /**
     * @description Get the complete history of a wallet
     * @param request Request with parameters.
     * @param {Object} request.address The address of the wallet
     * @param {Object} [request.chain] The chain to query (optional)
     * @param {Number} [request.fromBlock] The minimum block number from which to get the transactions
     * * Provide the param 'from_block' or 'from_date'
     * * If 'from_date' and 'from_block' are provided, 'from_block' will be used. (optional)
     * @param {Number} [request.toBlock] The maximum block number from which to get the transactions.
     * * Provide the param 'to_block' or 'to_date'
     * * If 'to_date' and 'to_block' are provided, 'to_block' will be used. (optional)
     * @param {String} [request.fromDate] The start date from which to get the transactions (format in seconds or datestring accepted by momentjs)
     * * Provide the param 'from_block' or 'from_date'
     * * If 'from_date' and 'from_block' are provided, 'from_block' will be used. (optional)
     * @param {Date} [request.toDate] Get the transactions up to this date (format in seconds or datestring accepted by momentjs)
     * * Provide the param 'to_block' or 'to_date'
     * * If 'to_date' and 'to_block' are provided, 'to_block' will be used. (optional)
     * @param {Boolean} [request.includeInternalTransactions] If the result should contain the internal transactions. (optional)
     * @param {Boolean} [request.includeInputData] Set the input data from the result (optional)
     * @param {Boolean} [request.includeLogsData] Set the logs data from the result (optional)
     * @param {Boolean} [request.nftMetadata] If the result should contain the nft metadata. (optional)
     * @param {String} [request.cursor] The cursor returned in the previous response (used for getting the next page). (optional)
     * @param {Object} [request.order] The order of the result, in ascending (ASC) or descending (DESC) (optional)
     * @param {Number} [request.limit] The desired page size of the result. (optional)
     * @returns {Object} Response for the request.
     */
    getWalletHistory: this.createEndpoint<
      GetWalletHistoryOperationRequest,
      GetWalletHistoryOperationRequestJSON,
      EvmWalletHistory,
      EvmWalletHistoryJSON
    >(GetWalletHistoryOperation),
    /**
     * @description Get token balances for a specific wallet address and their token prices in USD.
     * @param request Request with parameters.
     * @param {Object} request.address The address from which token balances will be checked
     * @param {Object} [request.chain] The chain to query (optional)
     * @param {Number} [request.toBlock] The block number up to which the balances will be checked. (optional)
     * @param {Object[]} [request.tokenAddresses] The addresses to get balances for (optional) (optional)
     * @param {Boolean} [request.excludeSpam] Exclude spam tokens from the result (optional)
     * @param {Boolean} [request.excludeUnverifiedContracts] Exclude unverified contracts from the result (optional)
     * @param {String} [request.cursor] The cursor returned in the previous response (used for getting the next page). (optional)
     * @param {Number} [request.limit] The desired page size of the result. (optional)
     * @param {Boolean} [request.excludeNative] Exclude native balance from the result (optional)
     * @returns {Object} Response for the request.
     */
    getWalletTokenBalancesPrice: this.createEndpoint<
      GetWalletTokenBalancesPriceOperationRequest,
      GetWalletTokenBalancesPriceOperationRequestJSON,
      EvmErc20TokenBalanceWithPriceResult,
      EvmErc20TokenBalanceWithPriceResultJSON
    >(GetWalletTokenBalancesPriceOperation),
    /**
     * @description Get the net worth of a wallet in USD. We recommend to filter out spam tokens and unverified contracts to get a more accurate result.
     * @param request Request with parameters.
     * @param {Object} request.address The wallet address
     * @param {Object[]} [request.chains] The chains to query (optional)
     * @param {Boolean} [request.excludeSpam] Exclude spam tokens from the result (optional)
     * @param {Boolean} [request.excludeUnverifiedContracts] Exclude unverified contracts from the result (optional)
     * @returns {Object} Response for the request.
     */
    getWalletNetWorth: this.createEndpoint<
      GetWalletNetWorthOperationRequest,
      GetWalletNetWorthOperationRequestJSON,
      EvmNetWorthResult,
      EvmNetWorthResultJSON
    >(GetWalletNetWorthOperation),
    /**
     * @description Get the defi summary of a wallet address.
     * @param request Request with parameters.
     * @param {Object} request.address Wallet address
     * @param {Object} [request.chain] The chain to query (optional)
     * @returns {Object} Response for the request.
     */
    getDefiSummary: this.createEndpoint<
      GetDefiSummaryOperationRequest,
      GetDefiSummaryOperationRequestJSON,
      EvmWalletDefiSummary,
      EvmWalletDefiSummaryJSON
    >(GetDefiSummaryOperation),
    /**
     * @description Get the detailed defi positions by protocol for a wallet address.
     * @param request Request with parameters.
     * @param {Object} request.address Wallet address
     * @param {Object} request.protocol The protocol to query
     * @param {Object} [request.chain] The chain to query (optional)
     * @returns {Object} Response for the request.
     */
    getDefiPositionsByProtocol: this.createEndpoint<
      GetDefiPositionsByProtocolOperationRequest,
      GetDefiPositionsByProtocolOperationRequestJSON,
      EvmGetDefiPositionsByProtocol,
      EvmGetDefiPositionsByProtocolJSON
    >(GetDefiPositionsByProtocolOperation),
    /**
     * @description Get the positions summary of a wallet address.
     * @param request Request with parameters.
     * @param {Object} request.address Wallet address
     * @param {Object} [request.chain] The chain to query (optional)
     * @returns {Object[]} Response for the request.
     */
    getDefiPositionsSummary: this.createEndpoint<
      GetDefiPositionsSummaryOperationRequest,
      GetDefiPositionsSummaryOperationRequestJSON,
      EvmDefiPositionSummaryResponse[],
      EvmDefiPositionSummaryResponseJSON[]
    >(GetDefiPositionsSummaryOperation),
    /**
     * @description Get the active chains for a wallet address.
     * @param request Request with parameters.
     * @param {Object} request.address Wallet address
     * @param {Object[]} [request.chains] The chains to query (optional)
     * @returns {Object} Response for the request.
     */
    getWalletActiveChains: this.createEndpoint<
      GetWalletActiveChainsOperationRequest,
      GetWalletActiveChainsOperationRequestJSON,
      EvmWalletActiveChains,
      EvmWalletActiveChainsJSON
    >(GetWalletActiveChainsOperation),
    /**
     * @description Get the stats for a wallet address.
     * @param request Request with parameters.
     * @param {Object} request.address Wallet address
     * @param {Object} [request.chain] The chain to query (optional)
     * @returns {Object} Response for the request.
     */
    getWalletStats: this.createEndpoint<
      GetWalletStatsOperationRequest,
      GetWalletStatsOperationRequestJSON,
      EvmWalletStat,
      EvmWalletStatJSON
    >(GetWalletStatsOperation),
    /**
     * @description Retrieves a summary of wallet profitability based on specified parameters including optional token addresses.
     * @param request Request with parameters.
     * @param {Object} request.address The wallet address for which profitability summary is to be retrieved.
     * @param {String} [request.days] Timeframe in days for the profitability summary. Options include 'all', '7', '30', '60', '90' default is 'all'. (optional)
     * @param {Object} [request.chain] The chain to query (optional)
     * @returns {Object} Response for the request.
     */
    getWalletProfitabilitySummary: this.createEndpoint<
      GetWalletProfitabilitySummaryOperationRequest,
      GetWalletProfitabilitySummaryOperationRequestJSON,
      EvmGetWalletProfitabilitySummary,
      EvmGetWalletProfitabilitySummaryJSON
    >(GetWalletProfitabilitySummaryOperation),
    /**
     * @description Retrieves profitability information for a specific wallet address. Can be filtered by one or more tokens.
     * @param request Request with parameters.
     * @param {Object} request.address The wallet address for which profitability is to be retrieved.
     * @param {String} [request.days] Timeframe in days for which profitability is calculated, Options include 'all', '7', '30', '60', '90' default is 'all'. (optional)
     * @param {Object} [request.chain] The chain to query (optional)
     * @param {Object[]} [request.tokenAddresses] The token addresses list to filter the result with (optional)
     * @returns {Object} Response for the request.
     */
    getWalletProfitability: this.createEndpoint<
      GetWalletProfitabilityOperationRequest,
      GetWalletProfitabilityOperationRequestJSON,
      EvmWalletProfitabilityResponse,
      EvmWalletProfitabilityResponseJSON
    >(GetWalletProfitabilityOperation),
  };
}
