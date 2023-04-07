import { AptosNetwork, AptosNetworkInput, AptosNetworkJSON } from '../../dataTypes';
import { AptosGetCoinTransfersByCoinTypeResponse, AptosGetCoinTransfersByCoinTypeResponseJSON } from '../types/AptosGetCoinTransfersByCoinTypeResponse';

// request parameters:
// - coin_type ($ref: #/paths/~1coins~1transfers~1{coin_type}/get/parameters/0/schema)
// - limit ($ref: #/paths/~1coins~1transfers~1{coin_type}/get/parameters/1/schema)
// - offset ($ref: #/paths/~1coins~1transfers~1{coin_type}/get/parameters/2/schema)
// - cursor ($ref: #/paths/~1coins~1transfers~1{coin_type}/get/parameters/3/schema)
// - from_date ($ref: #/paths/~1coins~1transfers~1{coin_type}/get/parameters/4/schema)
// - to_date ($ref: #/paths/~1coins~1transfers~1{coin_type}/get/parameters/5/schema)
// - network ($ref: #/virtualParameter/network)

export interface GetCoinTransfersByCoinTypeOperationRequest {
  /**
   * @description The coin type to fetch info about
   */
  readonly coinType: string;
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
   * @description The date from which to fetch coin transfers
   */
  readonly fromDate?: string;
  /**
   * @description The date to which to fetch coin transfers
   */
  readonly toDate?: string;
  /**
   * @description The network of query. Defaults to mainnet.
   */
  readonly network?: AptosNetworkInput | AptosNetwork;
}

export interface GetCoinTransfersByCoinTypeOperationRequestJSON {
  readonly coin_type: string;
  readonly limit: number;
  readonly offset?: number;
  readonly cursor?: string;
  readonly from_date?: string;
  readonly to_date?: string;
  readonly network?: AptosNetworkJSON;
}

export const GetCoinTransfersByCoinTypeOperation = {
  operationId: "getCoinTransfersByCoinType",
  groupName: "coins",
  httpMethod: "get",
  routePattern: "/coins/transfers/{coin_type}",
  parameterNames: ["coinType","limit","offset","cursor","fromDate","toDate","network"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: AptosGetCoinTransfersByCoinTypeResponseJSON): AptosGetCoinTransfersByCoinTypeResponse {
    return AptosGetCoinTransfersByCoinTypeResponse.fromJSON(json);
  },

  serializeRequest(request: GetCoinTransfersByCoinTypeOperationRequest): GetCoinTransfersByCoinTypeOperationRequestJSON {
    const coinType = request.coinType;
    const limit = request.limit;
    const offset = request.offset;
    const cursor = request.cursor;
    const fromDate = request.fromDate;
    const toDate = request.toDate;
    const network = request.network ? AptosNetwork.create(request.network) : undefined;
    return {
      coin_type: coinType,
      limit: limit,
      offset: offset,
      cursor: cursor,
      from_date: fromDate,
      to_date: toDate,
      network: network ? network.toJSON() : undefined,
    };
  },

}
