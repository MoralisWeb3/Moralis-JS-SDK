import { AptosGetCoinTransfersByBlockHeightsResponse, AptosGetCoinTransfersByBlockHeightsResponseJSON } from '../types/AptosGetCoinTransfersByBlockHeightsResponse';

// request parameters:
// - limit ($ref: #/paths/~1coins~1transfers~1blocks/get/parameters/0/schema)
// - offset ($ref: #/paths/~1coins~1transfers~1blocks/get/parameters/1/schema)
// - cursor ($ref: #/paths/~1coins~1transfers~1blocks/get/parameters/2/schema)
// - block_heights ($ref: #/paths/~1coins~1transfers~1blocks/get/parameters/3/schema)

export interface GetCoinTransfersByBlockHeightsOperationRequest {
  readonly limit: number;
  readonly offset?: number;
  readonly cursor?: string;
  readonly blockHeights: string[];
}

export interface GetCoinTransfersByBlockHeightsOperationRequestJSON {
  readonly limit: number;
  readonly offset?: number;
  readonly cursor?: string;
  readonly block_heights: string[];
}

export const GetCoinTransfersByBlockHeightsOperation = {
  operationId: "getCoinTransfersByBlockHeights",
  groupName: "coins",
  httpMethod: "get",
  routePattern: "/coins/transfers/blocks",
  parameterNames: ["limit","offset","cursor","block_heights"],
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
    return {
      limit: limit,
      offset: offset,
      cursor: cursor,
      block_heights: blockHeights,
    };
  },

}
