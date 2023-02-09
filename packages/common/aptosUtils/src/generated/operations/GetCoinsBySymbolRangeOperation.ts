import { AptosGetCoinsBySymbolRangeResponse, AptosGetCoinsBySymbolRangeResponseJSON } from '../types/AptosGetCoinsBySymbolRangeResponse';

// request parameters:
// - limit ($ref: #/paths/~1coins~1symbols/get/parameters/0/schema)
// - offset ($ref: #/paths/~1coins~1symbols/get/parameters/1/schema)
// - cursor ($ref: #/paths/~1coins~1symbols/get/parameters/2/schema)
// - from_symbol ($ref: #/paths/~1coins~1symbols/get/parameters/3/schema)
// - to_symbol ($ref: #/paths/~1coins~1symbols/get/parameters/4/schema)

export interface GetCoinsBySymbolRangeOperationRequest {
  readonly limit: number;
  readonly offset?: number;
  readonly cursor?: string;
  readonly fromSymbol?: string;
  readonly toSymbol?: string;
}

export interface GetCoinsBySymbolRangeOperationRequestJSON {
  readonly limit: number;
  readonly offset?: number;
  readonly cursor?: string;
  readonly from_symbol?: string;
  readonly to_symbol?: string;
}

export const GetCoinsBySymbolRangeOperation = {
  operationId: "getCoinsBySymbolRange",
  groupName: "coins",
  httpMethod: "get",
  routePattern: "/coins/symbols",
  parameterNames: ["limit","offset","cursor","from_symbol","to_symbol"],
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
    return {
      limit: limit,
      offset: offset,
      cursor: cursor,
      from_symbol: fromSymbol,
      to_symbol: toSymbol,
    };
  },

}
