import { AptosNetwork, AptosNetworkInput, AptosNetworkJSON } from '../../dataTypes';
import { AptosNFTOwnersByTokensResponse, AptosNFTOwnersByTokensResponseJSON } from '../types/AptosNFTOwnersByTokensResponse';

// request parameters:
// - limit ($ref: #/paths/~1nfts~1owners/get/parameters/0/schema)
// - offset ($ref: #/paths/~1nfts~1owners/get/parameters/1/schema)
// - cursor ($ref: #/paths/~1nfts~1owners/get/parameters/2/schema)
// - token_ids ($ref: #/paths/~1nfts~1owners/get/parameters/3/schema)
// - network ($ref: #/virtualParameter/network)

export interface GetNFTOwnersByTokensOperationRequest {
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
   * @description The identifiers of the tokens to get owners for
   */
  readonly tokenIds: string[];
  /**
   * @description The network of query. Defaults to mainnet.
   */
  readonly network?: AptosNetworkInput | AptosNetwork;
}

export interface GetNFTOwnersByTokensOperationRequestJSON {
  readonly limit: number;
  readonly offset?: number;
  readonly cursor?: string;
  readonly token_ids: string[];
  readonly network?: AptosNetworkJSON;
}

export const GetNFTOwnersByTokensOperation = {
  operationId: "getNFTOwnersByTokens",
  groupName: "nfts",
  httpMethod: "get",
  routePattern: "/nfts/owners",
  parameterNames: ["limit","offset","cursor","token_ids","network"],
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
    const network = request.network ? AptosNetwork.create(request.network) : undefined;
    return {
      limit: limit,
      offset: offset,
      cursor: cursor,
      token_ids: tokenIds,
      network: network ? network.toJSON() : undefined,
    };
  },

}
