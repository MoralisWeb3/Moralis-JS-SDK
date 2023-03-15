import { AptosNetwork, AptosNetworkInput, AptosNetworkJSON } from '../../dataTypes';
import { AptosGetLatestCoinsResponse, AptosGetLatestCoinsResponseJSON } from '../types/AptosGetLatestCoinsResponse';

// request parameters:
// - limit ($ref: #/paths/~1coins~1latest/get/parameters/0/schema)
// - offset ($ref: #/paths/~1coins~1latest/get/parameters/1/schema)
// - cursor ($ref: #/paths/~1coins~1latest/get/parameters/2/schema)
// - network ($ref: #/virtualParameter/network)

export interface GetLatestCoinsOperationRequest {
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
   * @description The network of query. Defaults to mainnet.
   */
  readonly network?: AptosNetworkInput | AptosNetwork;
}

export interface GetLatestCoinsOperationRequestJSON {
  readonly limit: number;
  readonly offset?: number;
  readonly cursor?: string;
  readonly network?: AptosNetworkJSON;
}

export const GetLatestCoinsOperation = {
  operationId: "getLatestCoins",
  groupName: "coins",
  httpMethod: "get",
  routePattern: "/coins/latest",
  parameterNames: ["limit","offset","cursor","network"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: AptosGetLatestCoinsResponseJSON): AptosGetLatestCoinsResponse {
    return AptosGetLatestCoinsResponse.fromJSON(json);
  },

  serializeRequest(request: GetLatestCoinsOperationRequest): GetLatestCoinsOperationRequestJSON {
    const limit = request.limit;
    const offset = request.offset;
    const cursor = request.cursor;
    const network = request.network ? AptosNetwork.create(request.network) : undefined;
    return {
      limit: limit,
      offset: offset,
      cursor: cursor,
      network: network ? network.toJSON() : undefined,
    };
  },

}
