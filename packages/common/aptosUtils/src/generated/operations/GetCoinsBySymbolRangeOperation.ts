import { AptosNetwork, AptosNetworkInput, AptosNetworkJSON } from '../../dataTypes';
import { AptosGetCoinsBySymbolRangeResponse, AptosGetCoinsBySymbolRangeResponseJSON } from '../types/AptosGetCoinsBySymbolRangeResponse';

// request parameters:
// - limit ($ref: #/paths/~1coins~1symbols/get/parameters/0/schema)
// - offset ($ref: #/paths/~1coins~1symbols/get/parameters/1/schema)
// - cursor ($ref: #/paths/~1coins~1symbols/get/parameters/2/schema)
// - from_symbol ($ref: #/paths/~1coins~1symbols/get/parameters/3/schema)
// - to_symbol ($ref: #/paths/~1coins~1symbols/get/parameters/4/schema)
// - network ($ref: #/virtualParameter/network)

export interface GetCoinsBySymbolRangeOperationRequest {
  /**
   * @description The number of results to return
   */
  readonly limit: number;
  /**
   * @description The number of results to skip
   */
  readonly offset?: number;
  /**
   * @description The cursor to use for getting the next page
   */
  readonly cursor?: string;
  /**
   * @description The name of the coin to start from (inclusive and case sensitive)
   */
  readonly fromSymbol?: string;
  /**
   * @description The name of the coin to end at (inclusive and case sensitive)
   */
  readonly toSymbol?: string;
  /**
   * @description The network of query. Defaults to mainnet.
   */
  readonly network?: AptosNetworkInput | AptosNetwork;
}

export interface GetCoinsBySymbolRangeOperationRequestJSON {
  readonly limit: number;
  readonly offset?: number;
  readonly cursor?: string;
  readonly from_symbol?: string;
  readonly to_symbol?: string;
  readonly network?: AptosNetworkJSON;
}

export const GetCoinsBySymbolRangeOperation = {
  operationId: "getCoinsBySymbolRange",
  groupName: "coins",
  httpMethod: "get",
  routePattern: "/coins/symbols",
  parameterNames: ["limit","offset","cursor","from_symbol","to_symbol","network"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: AptosGetCoinsBySymbolRangeResponseJSON): AptosGetCoinsBySymbolRangeResponse {
    return AptosGetCoinsBySymbolRangeResponse.fromJSON(json);
  },

  serializeRequest(request: GetCoinsBySymbolRangeOperationRequest): GetCoinsBySymbolRangeOperationRequestJSON {
    const limit = request.limit;
    const offset = request.offset;
    const cursor = request.cursor;
    const fromSymbol = request.fromSymbol;
    const toSymbol = request.toSymbol;
    const network = request.network ? AptosNetwork.create(request.network) : undefined;
    return {
      limit: limit,
      offset: offset,
      cursor: cursor,
      from_symbol: fromSymbol,
      to_symbol: toSymbol,
      network: network ? network.toJSON() : undefined,
    };
  },

}
