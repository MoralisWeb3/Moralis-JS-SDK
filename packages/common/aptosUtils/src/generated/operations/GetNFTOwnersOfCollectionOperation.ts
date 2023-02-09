import { AptosNFTOwnersOfCollectionResponse, AptosNFTOwnersOfCollectionResponseJSON } from '../types/AptosNFTOwnersOfCollectionResponse';

// request parameters:
// - collection_data_id_hash ($ref: #/paths/~1nfts~1collections~1{collection_data_id_hash}~1owners~1list/get/parameters/0/schema)
// - limit ($ref: #/paths/~1nfts~1collections~1{collection_data_id_hash}~1owners~1list/get/parameters/1/schema)
// - offset ($ref: #/paths/~1nfts~1collections~1{collection_data_id_hash}~1owners~1list/get/parameters/2/schema)
// - cursor ($ref: #/paths/~1nfts~1collections~1{collection_data_id_hash}~1owners~1list/get/parameters/3/schema)

export interface GetNFTOwnersOfCollectionOperationRequest {
  readonly collectionDataIdHash: string;
  readonly limit: number;
  readonly offset?: number;
  readonly cursor?: string;
}

export interface GetNFTOwnersOfCollectionOperationRequestJSON {
  readonly collection_data_id_hash: string;
  readonly limit: number;
  readonly offset?: number;
  readonly cursor?: string;
}

export const GetNFTOwnersOfCollectionOperation = {
  operationId: "getNFTOwnersOfCollection",
  groupName: "nfts",
  httpMethod: "get",
  routePattern: "/nfts/collections/{collection_data_id_hash}/owners/list",
  parameterNames: ["collection_data_id_hash","limit","offset","cursor"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: AptosNFTOwnersOfCollectionResponseJSON): AptosNFTOwnersOfCollectionResponse {
    return AptosNFTOwnersOfCollectionResponse.fromJSON(json);
  },

  serializeRequest(request: GetNFTOwnersOfCollectionOperationRequest): GetNFTOwnersOfCollectionOperationRequestJSON {
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
