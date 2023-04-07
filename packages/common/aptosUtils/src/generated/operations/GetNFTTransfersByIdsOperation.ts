import { AptosNetwork, AptosNetworkInput, AptosNetworkJSON } from '../../dataTypes';
import { AptosNFTTransfersByTokensResponse, AptosNFTTransfersByTokensResponseJSON } from '../types/AptosNFTTransfersByTokensResponse';

// request parameters:
// - limit ($ref: #/paths/~1nfts~1transfers/get/parameters/0/schema)
// - offset ($ref: #/paths/~1nfts~1transfers/get/parameters/1/schema)
// - cursor ($ref: #/paths/~1nfts~1transfers/get/parameters/2/schema)
// - wallet_blacklist ($ref: #/paths/~1nfts~1transfers/get/parameters/3/schema)
// - wallet_whitelist ($ref: #/paths/~1nfts~1transfers/get/parameters/4/schema)
// - token_ids ($ref: #/paths/~1nfts~1transfers/get/parameters/5/schema)
// - network ($ref: #/virtualParameter/network)

export interface GetNFTTransfersByIdsOperationRequest {
  /**
   * @description The number of tokens to return
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
   * @description The addresses of the wallets to blacklist
   */
  readonly walletBlacklist?: string[];
  /**
   * @description The addresses of the wallets to whitelist
   */
  readonly walletWhitelist?: string[];
  /**
   * @description The identifiers of the tokens to get
   */
  readonly tokenIds: string[];
  /**
   * @description The network of query. Defaults to mainnet.
   */
  readonly network?: AptosNetworkInput | AptosNetwork;
}

export interface GetNFTTransfersByIdsOperationRequestJSON {
  readonly limit: number;
  readonly offset?: number;
  readonly cursor?: string;
  readonly wallet_blacklist?: string[];
  readonly wallet_whitelist?: string[];
  readonly token_ids: string[];
  readonly network?: AptosNetworkJSON;
}

export const GetNFTTransfersByIdsOperation = {
  operationId: "getNFTTransfersByIds",
  groupName: "nfts",
  httpMethod: "get",
  routePattern: "/nfts/transfers",
  parameterNames: ["limit","offset","cursor","walletBlacklist","walletWhitelist","tokenIds","network"],
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
    const network = request.network ? AptosNetwork.create(request.network) : undefined;
    return {
      limit: limit,
      offset: offset,
      cursor: cursor,
      wallet_blacklist: walletBlacklist,
      wallet_whitelist: walletWhitelist,
      token_ids: tokenIds,
      network: network ? network.toJSON() : undefined,
    };
  },

}
