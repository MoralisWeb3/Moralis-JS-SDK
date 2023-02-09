import { AptosNFTTokensByCollectionResponse, AptosNFTTokensByCollectionResponseJSON } from '../types/AptosNFTTokensByCollectionResponse';

// request parameters:
// - collection_data_id_hash ($ref: #/paths/~1nfts~1collections~1{collection_data_id_hash}~1tokens/get/parameters/0/schema)
// - limit ($ref: #/paths/~1nfts~1collections~1{collection_data_id_hash}~1tokens/get/parameters/1/schema)
// - offset ($ref: #/paths/~1nfts~1collections~1{collection_data_id_hash}~1tokens/get/parameters/2/schema)
// - cursor ($ref: #/paths/~1nfts~1collections~1{collection_data_id_hash}~1tokens/get/parameters/3/schema)

export interface GetNFTsByCollectionOperationRequest {
  readonly collectionDataIdHash: string;
  readonly limit: number;
  readonly offset?: number;
  readonly cursor?: string;
}

export interface GetNFTsByCollectionOperationRequestJSON {
  readonly collection_data_id_hash: string;
  readonly limit: number;
  readonly offset?: number;
  readonly cursor?: string;
}

export const GetNFTsByCollectionOperation = {
  operationId: "getNFTsByCollection",
  groupName: "nfts",
  httpMethod: "get",
  routePattern: "/nfts/collections/{collection_data_id_hash}/tokens",
  parameterNames: ["collection_data_id_hash","limit","offset","cursor"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: AptosNFTTokensByCollectionResponseJSON): AptosNFTTokensByCollectionResponse {
    return AptosNFTTokensByCollectionResponse.fromJSON(json);
  },

  serializeRequest(request: GetNFTsByCollectionOperationRequest): GetNFTsByCollectionOperationRequestJSON {
    const collectionDataIdHash = request.collectionDataIdHash;
    const limit = request.limit;
    const offset = request.offset;
    const cursor = request.cursor;
    return {
      collection_data_id_hash: collectionDataIdHash,
      limit: limit,
      offset: offset,
      cursor: cursor,
    };
  },

}
