import { GetNFTTradesOperation, GetNFTTradesOperationRequest, GetNFTTradesOperationRequestJSON } from '../operations/GetNFTTradesOperation';
import { EvmTradeCollection, EvmTradeCollectionJSON } from '../types/EvmTradeCollection';
import { GetErc20TransfersOperation, GetErc20TransfersOperationRequest, GetErc20TransfersOperationRequestJSON } from '../operations/GetErc20TransfersOperation';
import { EvmErc20TransfersResponse, EvmErc20TransfersResponseJSON } from '../types/EvmErc20TransfersResponse';
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
     * @param {String} [request.fromDate] The start date from which to get the transfers (any format that is accepted by momentjs)
     * * Provide the param 'from_block' or 'from_date'
     * * If 'from_date' and 'from_block' are provided, 'from_block' will be used. (optional)
     * @param {String} [request.toDate] The end date from which to get the transfers (any format that is accepted by momentjs)
     * * Provide the param 'to_block' or 'to_date'
     * * If 'to_date' and 'to_block' are provided, 'to_block' will be used. (optional)
     * @param {String} [request.marketplace] Marketplace from which to get the trades (only OpenSea is supported at the moment) (optional)
     * @param {String} [request.cursor] The cursor returned in the previous response (used for getting the next page). (optional)
     * @param {Number} [request.limit] The desired page size of the result. (optional)
     * @param {Boolean} [request.disableTotal] If the result should skip returning the total count (Improves performance). (optional)
     * @returns {Object} Response for the request.
     */
    getNFTTrades: this.createEndpoint<
      GetNFTTradesOperationRequest,
      GetNFTTradesOperationRequestJSON,
      EvmTradeCollection,
      EvmTradeCollectionJSON
    >(GetNFTTradesOperation),
  };
  public readonly token = {
    /**
     * @description getErc20Transfers
     * @param request Request with parameters.
     * @param {Object} [request.chain] The chain to query (optional)
     * @param {Number} [request.fromBlock] The block number from which the transfers will be returned (optional)
     * @param {Number} [request.toBlock] The block number to which the transfers will be returned (optional)
     * @param {Number} [request.limit] The desired page size of the result. (optional)
     * @param {Object[]} [request.contractAddresses] Contract addresses to only include (optional)
     * @param {Object[]} [request.excludeContracts] Contract addresses to ignore (optional)
     * @param {Object[]} [request.walletAddresses] Wallet addresses to only include (optional)
     * @param {Object[]} [request.excludeWallets] Wallet addresses to ignore (optional)
     * @param {String} [request.cursor] The cursor returned in the previous response (used to getting the next page). (optional)
     * @returns {Object} Response for the request.
     */
    getErc20Transfers: this.createEndpoint<
      GetErc20TransfersOperationRequest,
      GetErc20TransfersOperationRequestJSON,
      EvmErc20TransfersResponse,
      EvmErc20TransfersResponseJSON
    >(GetErc20TransfersOperation),
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
  };
}
