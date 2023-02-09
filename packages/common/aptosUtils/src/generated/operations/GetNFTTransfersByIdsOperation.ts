import { AptosNFTTransfersByTokensResponse, AptosNFTTransfersByTokensResponseJSON } from '../types/AptosNFTTransfersByTokensResponse';

// request parameters:
// - limit ($ref: #/paths/~1nfts~1transfers/get/parameters/0/schema)
// - offset ($ref: #/paths/~1nfts~1transfers/get/parameters/1/schema)
// - cursor ($ref: #/paths/~1nfts~1transfers/get/parameters/2/schema)
// - wallet_blacklist ($ref: #/paths/~1nfts~1transfers/get/parameters/3/schema)
// - wallet_whitelist ($ref: #/paths/~1nfts~1transfers/get/parameters/4/schema)
// - token_ids ($ref: #/paths/~1nfts~1transfers/get/parameters/5/schema)

export interface GetNFTTransfersByIdsOperationRequest {
  readonly limit: number;
  readonly offset?: number;
  readonly cursor?: string;
  readonly walletBlacklist?: string[];
  readonly walletWhitelist?: string[];
  readonly tokenIds: string[];
}

export interface GetNFTTransfersByIdsOperationRequestJSON {
  readonly limit: number;
  readonly offset?: number;
  readonly cursor?: string;
  readonly wallet_blacklist?: string[];
  readonly wallet_whitelist?: string[];
  readonly token_ids: string[];
}

export const GetNFTTransfersByIdsOperation = {
  operationId: "getNFTTransfersByIds",
  groupName: "nfts",
  httpMethod: "get",
  routePattern: "/nfts/transfers",
  parameterNames: ["limit","offset","cursor","wallet_blacklist","wallet_whitelist","token_ids"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: AptosNFTTransfersByTokensResponseJSON[]): AptosNFTTransfersByTokensResponse[] {
    return json.map((item) => AptosNFTTransfersByTokensResponse.fromJSON(item));
  },

  serializeRequest(request: GetNFTTransfersByIdsOperationRequest): GetNFTTransfersByIdsOperationRequestJSON {
    const limit = request.limit;
    const offset = request.offset;
    const cursor = request.cursor;
    const walletBlacklist = request.walletBlacklist;
    const walletWhitelist = request.walletWhitelist;
    const tokenIds = request.tokenIds;
    return {
      limit: limit,
      offset: offset,
      cursor: cursor,
      wallet_blacklist: walletBlacklist,
      wallet_whitelist: walletWhitelist,
      token_ids: tokenIds,
    };
  },

}
