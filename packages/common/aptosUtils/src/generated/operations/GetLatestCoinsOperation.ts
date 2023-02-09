import { AptosGetLatestCoinsResponse, AptosGetLatestCoinsResponseJSON } from '../types/AptosGetLatestCoinsResponse';

// request parameters:
// - limit ($ref: #/paths/~1coins~1latest/get/parameters/0/schema)
// - offset ($ref: #/paths/~1coins~1latest/get/parameters/1/schema)
// - cursor ($ref: #/paths/~1coins~1latest/get/parameters/2/schema)

export interface GetLatestCoinsOperationRequest {
  readonly limit: number;
  readonly offset?: number;
  readonly cursor?: string;
}

export interface GetLatestCoinsOperationRequestJSON {
  readonly limit: number;
  readonly offset?: number;
  readonly cursor?: string;
}

export const GetLatestCoinsOperation = {
  operationId: "getLatestCoins",
  groupName: "coins",
  httpMethod: "get",
  routePattern: "/coins/latest",
  parameterNames: ["limit","offset","cursor"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: AptosGetLatestCoinsResponseJSON): AptosGetLatestCoinsResponse {
    return AptosGetLatestCoinsResponse.fromJSON(json);
  },

  serializeRequest(request: GetLatestCoinsOperationRequest): GetLatestCoinsOperationRequestJSON {
    const limit = request.limit;
    const offset = request.offset;
    const cursor = request.cursor;
    return {
      limit: limit,
      offset: offset,
      cursor: cursor,
    };
  },

}
