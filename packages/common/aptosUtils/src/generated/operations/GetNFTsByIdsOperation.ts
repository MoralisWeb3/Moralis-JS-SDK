import { AptosNFTTokenResponse, AptosNFTTokenResponseJSON } from '../types/AptosNFTTokenResponse';

// request parameters:
// - token_ids ($ref: #/paths/~1nfts/get/parameters/0/schema)

export interface GetNFTsByIdsOperationRequest {
  readonly tokenIds: string[];
}

export interface GetNFTsByIdsOperationRequestJSON {
  readonly token_ids: string[];
}

export const GetNFTsByIdsOperation = {
  operationId: "getNFTsByIds",
  groupName: "nfts",
  httpMethod: "get",
  routePattern: "/nfts",
  parameterNames: ["token_ids"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: AptosNFTTokenResponseJSON[]): AptosNFTTokenResponse[] {
    return json.map((item) => AptosNFTTokenResponse.fromJSON(item));
  },

  serializeRequest(request: GetNFTsByIdsOperationRequest): GetNFTsByIdsOperationRequestJSON {
    const tokenIds = request.tokenIds;
    return {
      token_ids: tokenIds,
    };
  },

}
