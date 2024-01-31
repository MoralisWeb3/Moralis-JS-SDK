import { GetNFTTradesOperation, GetNFTTradesOperationRequest, GetNFTTradesOperationRequestJSON } from '../operations/GetNFTTradesOperation';
import { EvmTradeCollection, EvmTradeCollectionJSON } from '../types/EvmTradeCollection';
import { GetMultipleTokenPricesOperation, GetMultipleTokenPricesOperationRequest, GetMultipleTokenPricesOperationRequestJSON } from '../operations/GetMultipleTokenPricesOperation';
import { EvmErc20Price, EvmErc20PriceJSON } from '../types/EvmErc20Price';
import { EvmGetMultipleTokenPricesDto, EvmGetMultipleTokenPricesDtoInput, EvmGetMultipleTokenPricesDtoJSON } from '../types/EvmGetMultipleTokenPricesDto';
import { Web3ApiVersionOperation, Web3ApiVersionOperationRequest, Web3ApiVersionOperationRequestJSON } from '../operations/Web3ApiVersionOperation';
import { EvmWeb3version, EvmWeb3versionJSON } from '../types/EvmWeb3version';
import { EndpointWeightsOperation, EndpointWeightsOperationRequest, EndpointWeightsOperationRequestJSON } from '../operations/EndpointWeightsOperation';
import { EvmEndpointWeights, EvmEndpointWeightsJSON } from '../types/EvmEndpointWeights';
import { GetTopERC20TokensByMarketCapOperation, GetTopERC20TokensByMarketCapOperationRequest, GetTopERC20TokensByMarketCapOperationRequestJSON } from '../operations/GetTopERC20TokensByMarketCapOperation';
import { EvmMarketDataERC20TokenItem, EvmMarketDataERC20TokenItemJSON } from '../types/EvmMarketDataERC20TokenItem';
import { GetTopERC20TokensByPriceMoversOperation, GetTopERC20TokensByPriceMoversOperationRequest, GetTopERC20TokensByPriceMoversOperationRequestJSON } from '../operations/GetTopERC20TokensByPriceMoversOperation';
import { EvmMarketDataERC20TokensByPriceMovers, EvmMarketDataERC20TokensByPriceMoversJSON } from '../types/EvmMarketDataERC20TokensByPriceMovers';
import { GetTopNFTCollectionsByMarketCapOperation, GetTopNFTCollectionsByMarketCapOperationRequest, GetTopNFTCollectionsByMarketCapOperationRequestJSON } from '../operations/GetTopNFTCollectionsByMarketCapOperation';
import { EvmMarketDataTopNFTCollectionByMarketCapItem, EvmMarketDataTopNFTCollectionByMarketCapItemJSON } from '../types/EvmMarketDataTopNFTCollectionByMarketCapItem';
import { GetHottestNFTCollectionsByTradingVolumeOperation, GetHottestNFTCollectionsByTradingVolumeOperationRequest, GetHottestNFTCollectionsByTradingVolumeOperationRequestJSON } from '../operations/GetHottestNFTCollectionsByTradingVolumeOperation';
import { EvmMarketDataHottestNFTCollectionByTradingVolumeItem, EvmMarketDataHottestNFTCollectionByTradingVolumeItemJSON } from '../types/EvmMarketDataHottestNFTCollectionByTradingVolumeItem';
import { ReviewContractsOperation, ReviewContractsOperationRequest, ReviewContractsOperationRequestJSON } from '../operations/ReviewContractsOperation';
import { EvmReviewContracts, EvmReviewContractsJSON } from '../types/EvmReviewContracts';
import { EvmContractsReviewDto, EvmContractsReviewDtoInput, EvmContractsReviewDtoJSON } from '../types/EvmContractsReviewDto';
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
import { GetTokenPairOhlcOperation, GetTokenPairOhlcOperationRequest, GetTokenPairOhlcOperationRequestJSON } from '../operations/GetTokenPairOhlcOperation';
import { EvmOhlcResponse, EvmOhlcResponseJSON } from '../types/EvmOhlcResponse';

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
  };
  public readonly nft = {
    /**
     * @description Get trades of NFTs for a given contract and marketplace.
     * @param request Request with parameters.
     * @param {Object} request.address The address of the NFT contract
     * @param {Object} [request.chain] The chain to query (optional)
     * @param {Number} [request.fromBlock] The minimum block number from which to get the transfers
     * * Provide the param 'from_block' or 'from_date'
     * * If 'from_date' and 'from_block' are provided, 'from_block' will be used. (optional)
     * @param {String} [request.toBlock] The block number to get the trades from (optional)
     * @param {String} [request.fromDate] The start date from which to get the transfers (format in seconds or datestring accepted by momentjs)
     * * Provide the param 'from_block' or 'from_date'
     * * If 'from_date' and 'from_block' are provided, 'from_block' will be used. (optional)
     * @param {String} [request.toDate] The end date from which to get the transfers (format in seconds or datestring accepted by momentjs)
     * * Provide the param 'to_block' or 'to_date'
     * * If 'to_date' and 'to_block' are provided, 'to_block' will be used. (optional)
     * @param {Object} [request.marketplace] Marketplace from which to get the trades (only OpenSea is supported at the moment) (optional)
     * @param {String} [request.cursor] The cursor returned in the previous response (used for getting the next page). (optional)
     * @param {Number} [request.limit] The desired page size of the result. (optional)
     * @returns {Object} Response for the request.
     */
    getNFTTrades: this.createEndpoint<
      GetNFTTradesOperationRequest,
      GetNFTTradesOperationRequestJSON,
      EvmTradeCollection,
      EvmTradeCollectionJSON
    >(GetNFTTradesOperation),
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
     * @description Get OHLC candle sticks of token pair.
     * @param request Request with parameters.
     * @param {String} request.token0 The base token address
     * @param {String} request.token1 The quote token address
     * @param {String} request.exchange The factory name or address of the token exchange
     * @param {Object} request.interval The interval of the ohlc candles
     * @param {String} request.priceFormat The price format of the ohlc candles (usd, native)
     * @param {String} request.fromDate The date from where to get the ohlc candles (format in seconds or datestring accepted by momentjs).
     * @param {String} request.toDate Get ohlc candles up until this date (format in seconds or datestring accepted by momentjs).
     * @param {Object} [request.chain] The chain to query (optional)
     * @param {Number} [request.limit] The maximum number of ohlc candles to return (max 100) (optional)
     * @param {String} [request.cursor] The cursor returned in the previous response (used for getting the next page). (optional)
     * @returns {Object} Response for the request.
     */
    getTokenPairOhlc: this.createEndpoint<
      GetTokenPairOhlcOperationRequest,
      GetTokenPairOhlcOperationRequestJSON,
      EvmOhlcResponse,
      EvmOhlcResponseJSON
    >(GetTokenPairOhlcOperation),
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
  };
}
