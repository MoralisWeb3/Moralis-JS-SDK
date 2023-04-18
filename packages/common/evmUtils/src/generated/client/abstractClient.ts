import { GetNFTTradesOperation, GetNFTTradesOperationRequest, GetNFTTradesOperationRequestJSON } from '../operations/GetNFTTradesOperation';
import { EvmTradeCollection, EvmTradeCollectionJSON } from '../types/EvmTradeCollection';
import { Web3ApiVersionOperation, Web3ApiVersionOperationRequest, Web3ApiVersionOperationRequestJSON } from '../operations/Web3ApiVersionOperation';
import { EvmWeb3version, EvmWeb3versionJSON } from '../types/EvmWeb3version';
import { EndpointWeightsOperation, EndpointWeightsOperationRequest, EndpointWeightsOperationRequestJSON } from '../operations/EndpointWeightsOperation';
import { EvmEndpointWeights, EvmEndpointWeightsJSON } from '../types/EvmEndpointWeights';

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
