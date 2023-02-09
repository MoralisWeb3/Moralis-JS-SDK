import { AptosGetCoinsByNameRangeResponse, AptosGetCoinsByNameRangeResponseJSON } from '../types/AptosGetCoinsByNameRangeResponse';

// request parameters:
// - limit ($ref: #/paths/~1coins~1names/get/parameters/0/schema)
// - offset ($ref: #/paths/~1coins~1names/get/parameters/1/schema)
// - cursor ($ref: #/paths/~1coins~1names/get/parameters/2/schema)
// - from_name ($ref: #/paths/~1coins~1names/get/parameters/3/schema)
// - to_name ($ref: #/paths/~1coins~1names/get/parameters/4/schema)

export interface GetCoinsByNameRangeOperationRequest {
  readonly limit: number;
  readonly offset?: number;
  readonly cursor?: string;
  readonly fromName?: string;
  readonly toName?: string;
}

export interface GetCoinsByNameRangeOperationRequestJSON {
  readonly limit: number;
  readonly offset?: number;
  readonly cursor?: string;
  readonly from_name?: string;
  readonly to_name?: string;
}

export const GetCoinsByNameRangeOperation = {
  operationId: "getCoinsByNameRange",
  groupName: "coins",
  httpMethod: "get",
  routePattern: "/coins/names",
  parameterNames: ["limit","offset","cursor","from_name","to_name"],
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
    return {
      limit: limit,
      offset: offset,
      cursor: cursor,
      from_name: fromName,
      to_name: toName,
    };
  },

}
