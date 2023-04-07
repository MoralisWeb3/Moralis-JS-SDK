import { AptosNetwork, AptosNetworkInput, AptosNetworkJSON } from '../../dataTypes';
import { AptosGetNFTTransfersByCollectionResponse, AptosGetNFTTransfersByCollectionResponseJSON } from '../types/AptosGetNFTTransfersByCollectionResponse';

// request parameters:
// - collection_data_id_hash ($ref: #/paths/~1nfts~1transfers~1collections~1{collection_data_id_hash}/get/parameters/0/schema)
// - limit ($ref: #/paths/~1nfts~1transfers~1collections~1{collection_data_id_hash}/get/parameters/1/schema)
// - offset ($ref: #/paths/~1nfts~1transfers~1collections~1{collection_data_id_hash}/get/parameters/2/schema)
// - cursor ($ref: #/paths/~1nfts~1transfers~1collections~1{collection_data_id_hash}/get/parameters/3/schema)
// - wallet_whitelist ($ref: #/paths/~1nfts~1transfers~1collections~1{collection_data_id_hash}/get/parameters/4/schema)
// - wallet_blacklist ($ref: #/paths/~1nfts~1transfers~1collections~1{collection_data_id_hash}/get/parameters/5/schema)
// - network ($ref: #/virtualParameter/network)

export interface GetNFTTransfersByCollectionOperationRequest {
  /**
   * @description The collection data id hash of the token
   */
  readonly collectionDataIdHash: string;
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
   * @description The addresses of the wallets to whitelist
   */
  readonly walletWhitelist?: string[];
  /**
   * @description The addresses of the wallets to blacklist
   */
  readonly walletBlacklist?: string[];
  /**
   * @description The network of query. Defaults to mainnet.
   */
  readonly network?: AptosNetworkInput | AptosNetwork;
}

export interface GetNFTTransfersByCollectionOperationRequestJSON {
  readonly collection_data_id_hash: string;
  readonly limit: number;
  readonly offset?: number;
  readonly cursor?: string;
  readonly wallet_whitelist?: string[];
  readonly wallet_blacklist?: string[];
  readonly network?: AptosNetworkJSON;
}

export const GetNFTTransfersByCollectionOperation = {
  operationId: "getNFTTransfersByCollection",
  groupName: "nfts",
  httpMethod: "get",
  routePattern: "/nfts/transfers/collections/{collection_data_id_hash}",
  parameterNames: ["collectionDataIdHash","limit","offset","cursor","walletWhitelist","walletBlacklist","network"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: AptosGetNFTTransfersByCollectionResponseJSON): AptosGetNFTTransfersByCollectionResponse {
    return AptosGetNFTTransfersByCollectionResponse.fromJSON(json);
  },

  serializeRequest(request: GetNFTTransfersByCollectionOperationRequest): GetNFTTransfersByCollectionOperationRequestJSON {
    const collectionDataIdHash = request.collectionDataIdHash;
    const limit = request.limit;
    const offset = request.offset;
    const cursor = request.cursor;
    const walletWhitelist = request.walletWhitelist;
    const walletBlacklist = request.walletBlacklist;
    const network = request.network ? AptosNetwork.create(request.network) : undefined;
    return {
      collection_data_id_hash: collectionDataIdHash,
      limit: limit,
      offset: offset,
      cursor: cursor,
      wallet_whitelist: walletWhitelist,
      wallet_blacklist: walletBlacklist,
      network: network ? network.toJSON() : undefined,
    };
  },

}
