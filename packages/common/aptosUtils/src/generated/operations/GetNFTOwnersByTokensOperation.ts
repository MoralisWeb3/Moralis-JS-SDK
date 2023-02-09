import { AptosNFTOwnersByTokensResponse, AptosNFTOwnersByTokensResponseJSON } from '../types/AptosNFTOwnersByTokensResponse';

// request parameters:
// - limit ($ref: #/paths/~1nfts~1owners/get/parameters/0/schema)
// - offset ($ref: #/paths/~1nfts~1owners/get/parameters/1/schema)
// - cursor ($ref: #/paths/~1nfts~1owners/get/parameters/2/schema)
// - token_ids ($ref: #/paths/~1nfts~1owners/get/parameters/3/schema)

export interface GetNFTOwnersByTokensOperationRequest {
  readonly limit: number;
  readonly offset?: number;
  readonly cursor?: string;
  readonly tokenIds: string[];
}

export interface GetNFTOwnersByTokensOperationRequestJSON {
  readonly limit: number;
  readonly offset?: number;
  readonly cursor?: string;
  readonly token_ids: string[];
}

export const GetNFTOwnersByTokensOperation = {
  operationId: "getNFTOwnersByTokens",
  groupName: "nfts",
  httpMethod: "get",
  routePattern: "/nfts/owners",
  parameterNames: ["limit","offset","cursor","token_ids"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: AptosNFTOwnersByTokensResponseJSON): AptosNFTOwnersByTokensResponse {
    return AptosNFTOwnersByTokensResponse.fromJSON(json);
  },

  serializeRequest(request: GetNFTOwnersByTokensOperationRequest): GetNFTOwnersByTokensOperationRequestJSON {
    const limit = request.limit;
    const offset = request.offset;
    const cursor = request.cursor;
    const tokenIds = request.tokenIds;
    return {
      limit: limit,
      offset: offset,
      cursor: cursor,
      token_ids: tokenIds,
    };
  },

}
