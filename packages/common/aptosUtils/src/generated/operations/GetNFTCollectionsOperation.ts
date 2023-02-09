import { AptosNFTCollectionsByNameRangeResponse, AptosNFTCollectionsByNameRangeResponseJSON } from '../types/AptosNFTCollectionsByNameRangeResponse';

// request parameters:
// - limit ($ref: #/paths/~1collections/get/parameters/0/schema)
// - offset ($ref: #/paths/~1collections/get/parameters/1/schema)
// - cursor ($ref: #/paths/~1collections/get/parameters/2/schema)
// - fromName ($ref: #/paths/~1collections/get/parameters/3/schema)
// - toName ($ref: #/paths/~1collections/get/parameters/4/schema)

export interface GetNFTCollectionsOperationRequest {
  readonly limit: number;
  readonly offset?: number;
  readonly cursor?: string;
  readonly fromName?: string;
  readonly toName?: string;
}

export interface GetNFTCollectionsOperationRequestJSON {
  readonly limit: number;
  readonly offset?: number;
  readonly cursor?: string;
  readonly fromName?: string;
  readonly toName?: string;
}

export const GetNFTCollectionsOperation = {
  operationId: "getNFTCollections",
  groupName: "collections",
  httpMethod: "get",
  routePattern: "/collections",
  parameterNames: ["limit","offset","cursor","fromName","toName"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: AptosNFTCollectionsByNameRangeResponseJSON): AptosNFTCollectionsByNameRangeResponse {
    return AptosNFTCollectionsByNameRangeResponse.fromJSON(json);
  },

  serializeRequest(request: GetNFTCollectionsOperationRequest): GetNFTCollectionsOperationRequestJSON {
    const limit = request.limit;
    const offset = request.offset;
    const cursor = request.cursor;
    const fromName = request.fromName;
    const toName = request.toName;
    return {
      limit: limit,
      offset: offset,
      cursor: cursor,
      fromName: fromName,
      toName: toName,
    };
  },

}
