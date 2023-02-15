import { AptosNetwork, AptosNetworkInput, AptosNetworkJSON } from '../../dataTypes';
import { AptosGetCoinTransfersByBlockHeightsResponse, AptosGetCoinTransfersByBlockHeightsResponseJSON } from '../types/AptosGetCoinTransfersByBlockHeightsResponse';

// request parameters:
// - limit ($ref: #/paths/~1coins~1transfers~1blocks/get/parameters/0/schema)
// - offset ($ref: #/paths/~1coins~1transfers~1blocks/get/parameters/1/schema)
// - cursor ($ref: #/paths/~1coins~1transfers~1blocks/get/parameters/2/schema)
// - block_heights ($ref: #/paths/~1coins~1transfers~1blocks/get/parameters/3/schema)
// - network ($ref: #/virtualParameter/network)

export interface GetCoinTransfersByBlockHeightsOperationRequest {
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
   * @description The coin types to fetch info about
   */
  readonly blockHeights: string[];
  /**
   * @description The network of query. Defaults to mainnet.
   */
  readonly network?: AptosNetworkInput | AptosNetwork;
}

export interface GetCoinTransfersByBlockHeightsOperationRequestJSON {
  readonly limit: number;
  readonly offset?: number;
  readonly cursor?: string;
  readonly block_heights: string[];
  readonly network?: AptosNetworkJSON;
}

export const GetCoinTransfersByBlockHeightsOperation = {
  operationId: "getCoinTransfersByBlockHeights",
  groupName: "coins",
  httpMethod: "get",
  routePattern: "/coins/transfers/blocks",
  parameterNames: ["limit","offset","cursor","block_heights","network"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: AptosGetCoinTransfersByBlockHeightsResponseJSON): AptosGetCoinTransfersByBlockHeightsResponse {
    return AptosGetCoinTransfersByBlockHeightsResponse.fromJSON(json);
  },

  serializeRequest(request: GetCoinTransfersByBlockHeightsOperationRequest): GetCoinTransfersByBlockHeightsOperationRequestJSON {
    const limit = request.limit;
    const offset = request.offset;
    const cursor = request.cursor;
    const blockHeights = request.blockHeights;
    const network = request.network ? AptosNetwork.create(request.network) : undefined;
    return {
      limit: limit,
      offset: offset,
      cursor: cursor,
      block_heights: blockHeights,
      network: network ? network.toJSON() : undefined,
    };
  },

}
