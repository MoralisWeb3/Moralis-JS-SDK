import { AptosGetCoinTransfersByCoinTypeResponse, AptosGetCoinTransfersByCoinTypeResponseJSON } from '../types/AptosGetCoinTransfersByCoinTypeResponse';

// request parameters:
// - coin_type ($ref: #/paths/~1coins~1transfers~1{coin_type}/get/parameters/0/schema)
// - limit ($ref: #/paths/~1coins~1transfers~1{coin_type}/get/parameters/1/schema)
// - offset ($ref: #/paths/~1coins~1transfers~1{coin_type}/get/parameters/2/schema)
// - cursor ($ref: #/paths/~1coins~1transfers~1{coin_type}/get/parameters/3/schema)
// - from_date ($ref: #/paths/~1coins~1transfers~1{coin_type}/get/parameters/4/schema)
// - to_date ($ref: #/paths/~1coins~1transfers~1{coin_type}/get/parameters/5/schema)

export interface GetCoinTransfersByCoinTypeOperationRequest {
  readonly coinType: string;
  readonly limit: number;
  readonly offset?: number;
  readonly cursor?: string;
  readonly fromDate?: string;
  readonly toDate?: string;
}

export interface GetCoinTransfersByCoinTypeOperationRequestJSON {
  readonly coin_type: string;
  readonly limit: number;
  readonly offset?: number;
  readonly cursor?: string;
  readonly from_date?: string;
  readonly to_date?: string;
}

export const GetCoinTransfersByCoinTypeOperation = {
  operationId: "getCoinTransfersByCoinType",
  groupName: "coins",
  httpMethod: "get",
  routePattern: "/coins/transfers/{coin_type}",
  parameterNames: ["coin_type","limit","offset","cursor","from_date","to_date"],
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
    return {
      coin_type: coinType,
      limit: limit,
      offset: offset,
      cursor: cursor,
      from_date: fromDate,
      to_date: toDate,
    };
  },

}
