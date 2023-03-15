import { AptosNetwork, AptosNetworkInput, AptosNetworkJSON } from '../../dataTypes';
import { AptosGetCoinsByNameRangeResponse, AptosGetCoinsByNameRangeResponseJSON } from '../types/AptosGetCoinsByNameRangeResponse';

// request parameters:
// - limit ($ref: #/paths/~1coins~1names/get/parameters/0/schema)
// - offset ($ref: #/paths/~1coins~1names/get/parameters/1/schema)
// - cursor ($ref: #/paths/~1coins~1names/get/parameters/2/schema)
// - from_name ($ref: #/paths/~1coins~1names/get/parameters/3/schema)
// - to_name ($ref: #/paths/~1coins~1names/get/parameters/4/schema)
// - network ($ref: #/virtualParameter/network)

export interface GetCoinsByNameRangeOperationRequest {
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
  readonly fromName?: string;
  /**
   * @description The name of the coin to end at (inclusive and case sensitive)
   */
  readonly toName?: string;
  /**
   * @description The network of query. Defaults to mainnet.
   */
  readonly network?: AptosNetworkInput | AptosNetwork;
}

export interface GetCoinsByNameRangeOperationRequestJSON {
  readonly limit: number;
  readonly offset?: number;
  readonly cursor?: string;
  readonly from_name?: string;
  readonly to_name?: string;
  readonly network?: AptosNetworkJSON;
}

export const GetCoinsByNameRangeOperation = {
  operationId: "getCoinsByNameRange",
  groupName: "coins",
  httpMethod: "get",
  routePattern: "/coins/names",
  parameterNames: ["limit","offset","cursor","from_name","to_name","network"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: AptosGetCoinsByNameRangeResponseJSON): AptosGetCoinsByNameRangeResponse {
    return AptosGetCoinsByNameRangeResponse.fromJSON(json);
  },

  serializeRequest(request: GetCoinsByNameRangeOperationRequest): GetCoinsByNameRangeOperationRequestJSON {
    const limit = request.limit;
    const offset = request.offset;
    const cursor = request.cursor;
    const fromName = request.fromName;
    const toName = request.toName;
    const network = request.network ? AptosNetwork.create(request.network) : undefined;
    return {
      limit: limit,
      offset: offset,
      cursor: cursor,
      from_name: fromName,
      to_name: toName,
      network: network ? network.toJSON() : undefined,
    };
  },

}
