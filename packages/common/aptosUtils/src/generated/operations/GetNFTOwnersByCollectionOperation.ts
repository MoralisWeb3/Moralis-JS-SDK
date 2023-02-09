import { AptosNFTOwnersByCollectionResponse, AptosNFTOwnersByCollectionResponseJSON } from '../types/AptosNFTOwnersByCollectionResponse';

// request parameters:
// - collection_data_id_hash ($ref: #/paths/~1nfts~1collections~1{collection_data_id_hash}~1owners/get/parameters/0/schema)
// - limit ($ref: #/paths/~1nfts~1collections~1{collection_data_id_hash}~1owners/get/parameters/1/schema)
// - offset ($ref: #/paths/~1nfts~1collections~1{collection_data_id_hash}~1owners/get/parameters/2/schema)
// - cursor ($ref: #/paths/~1nfts~1collections~1{collection_data_id_hash}~1owners/get/parameters/3/schema)
// - wallet_blacklist ($ref: #/paths/~1nfts~1collections~1{collection_data_id_hash}~1owners/get/parameters/4/schema)
// - wallet_whitelist ($ref: #/paths/~1nfts~1collections~1{collection_data_id_hash}~1owners/get/parameters/5/schema)

export interface GetNFTOwnersByCollectionOperationRequest {
  readonly collectionDataIdHash: string;
  readonly limit: number;
  readonly offset?: number;
  readonly cursor?: string;
  readonly walletBlacklist?: string[];
  readonly walletWhitelist?: string[];
}

export interface GetNFTOwnersByCollectionOperationRequestJSON {
  readonly collection_data_id_hash: string;
  readonly limit: number;
  readonly offset?: number;
  readonly cursor?: string;
  readonly wallet_blacklist?: string[];
  readonly wallet_whitelist?: string[];
}

export const GetNFTOwnersByCollectionOperation = {
  operationId: "getNFTOwnersByCollection",
  groupName: "nfts",
  httpMethod: "get",
  routePattern: "/nfts/collections/{collection_data_id_hash}/owners",
  parameterNames: ["collection_data_id_hash","limit","offset","cursor","wallet_blacklist","wallet_whitelist"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: AptosNFTOwnersByCollectionResponseJSON): AptosNFTOwnersByCollectionResponse {
    return AptosNFTOwnersByCollectionResponse.fromJSON(json);
  },

  serializeRequest(request: GetNFTOwnersByCollectionOperationRequest): GetNFTOwnersByCollectionOperationRequestJSON {
    const collectionDataIdHash = request.collectionDataIdHash;
    const limit = request.limit;
    const offset = request.offset;
    const cursor = request.cursor;
    const walletBlacklist = request.walletBlacklist;
    const walletWhitelist = request.walletWhitelist;
    return {
      collection_data_id_hash: collectionDataIdHash,
      limit: limit,
      offset: offset,
      cursor: cursor,
      wallet_blacklist: walletBlacklist,
      wallet_whitelist: walletWhitelist,
    };
  },

}
