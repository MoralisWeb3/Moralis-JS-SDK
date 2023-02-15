import { AptosNetwork, AptosNetworkInput, AptosNetworkJSON } from '../../dataTypes';
import { AptosNFTCollectionsByNameRangeResponse, AptosNFTCollectionsByNameRangeResponseJSON } from '../types/AptosNFTCollectionsByNameRangeResponse';

// request parameters:
// - limit ($ref: #/paths/~1collections/get/parameters/0/schema)
// - offset ($ref: #/paths/~1collections/get/parameters/1/schema)
// - cursor ($ref: #/paths/~1collections/get/parameters/2/schema)
// - fromName ($ref: #/paths/~1collections/get/parameters/3/schema)
// - toName ($ref: #/paths/~1collections/get/parameters/4/schema)
// - network ($ref: #/virtualParameter/network)

export interface GetNFTCollectionsOperationRequest {
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
   * @description The name of the collection to start from (inclusive and case sensitive)
   */
  readonly fromName?: string;
  /**
   * @description The name of the collection to end at (inclusive and case sensitive)
   */
  readonly toName?: string;
  /**
   * @description The network of query. Defaults to mainnet.
   */
  readonly network?: AptosNetworkInput | AptosNetwork;
}

export interface GetNFTCollectionsOperationRequestJSON {
  readonly limit: number;
  readonly offset?: number;
  readonly cursor?: string;
  readonly fromName?: string;
  readonly toName?: string;
  readonly network?: AptosNetworkJSON;
}

export const GetNFTCollectionsOperation = {
  operationId: "getNFTCollections",
  groupName: "collections",
  httpMethod: "get",
  routePattern: "/collections",
  parameterNames: ["limit","offset","cursor","fromName","toName","network"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: AptosNFTCollectionsByNameRangeResponseJSON): AptosNFTCollectionsByNameRangeResponse {
    return AptosNFTCollectionsByNameRangeResponse.fromJSON(json);
  },

  serializeRequest(request: GetNFTCollectionsOperationRequest): GetNFTCollectionsOperationRequestJSON {
    const limit = request.limit;
    const offset = request.offset;
    const cursor = request.cursor;
    const fromName = request.fromName;
    const toName = request.toName;
    const network = request.network ? AptosNetwork.create(request.network) : undefined;
    return {
      limit: limit,
      offset: offset,
      cursor: cursor,
      fromName: fromName,
      toName: toName,
      network: network ? network.toJSON() : undefined,
    };
  },

}
