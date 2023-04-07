import { AptosNetwork, AptosNetworkInput, AptosNetworkJSON } from '../../dataTypes';
import { AptosNFTTokensByCollectionResponse, AptosNFTTokensByCollectionResponseJSON } from '../types/AptosNFTTokensByCollectionResponse';

// request parameters:
// - collection_data_id_hash ($ref: #/paths/~1nfts~1collections~1{collection_data_id_hash}~1tokens/get/parameters/0/schema)
// - limit ($ref: #/paths/~1nfts~1collections~1{collection_data_id_hash}~1tokens/get/parameters/1/schema)
// - offset ($ref: #/paths/~1nfts~1collections~1{collection_data_id_hash}~1tokens/get/parameters/2/schema)
// - cursor ($ref: #/paths/~1nfts~1collections~1{collection_data_id_hash}~1tokens/get/parameters/3/schema)
// - network ($ref: #/virtualParameter/network)

export interface GetNFTsByCollectionOperationRequest {
  /**
   * @description The collection data id hash of the collection
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
   * @description The network of query. Defaults to mainnet.
   */
  readonly network?: AptosNetworkInput | AptosNetwork;
}

export interface GetNFTsByCollectionOperationRequestJSON {
  readonly collection_data_id_hash: string;
  readonly limit: number;
  readonly offset?: number;
  readonly cursor?: string;
  readonly network?: AptosNetworkJSON;
}

export const GetNFTsByCollectionOperation = {
  operationId: "getNFTsByCollection",
  groupName: "nfts",
  httpMethod: "get",
  routePattern: "/nfts/collections/{collection_data_id_hash}/tokens",
  parameterNames: ["collectionDataIdHash","limit","offset","cursor","network"],
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
    const network = request.network ? AptosNetwork.create(request.network) : undefined;
    return {
      collection_data_id_hash: collectionDataIdHash,
      limit: limit,
      offset: offset,
      cursor: cursor,
      network: network ? network.toJSON() : undefined,
    };
  },

}
