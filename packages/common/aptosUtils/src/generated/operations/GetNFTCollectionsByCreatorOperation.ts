import { AptosAddress, AptosAddressInput, AptosAddressJSON, AptosNetwork, AptosNetworkInput, AptosNetworkJSON } from '../../dataTypes';
import { AptosNFTCollectionsByCreatorResponse, AptosNFTCollectionsByCreatorResponseJSON } from '../types/AptosNFTCollectionsByCreatorResponse';

// request parameters:
// - limit ($ref: #/paths/~1collections~1creators/get/parameters/0/schema)
// - offset ($ref: #/paths/~1collections~1creators/get/parameters/1/schema)
// - cursor ($ref: #/paths/~1collections~1creators/get/parameters/2/schema)
// - creator_address ($ref: #/paths/~1collections~1creators/get/parameters/3/schema)
// - network ($ref: #/virtualParameter/network)

export interface GetNFTCollectionsByCreatorOperationRequest {
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
   * @description The address of the creator
   */
  readonly creatorAddress: AptosAddressInput | AptosAddress;
  /**
   * @description The network of query. Defaults to mainnet.
   */
  readonly network?: AptosNetworkInput | AptosNetwork;
}

export interface GetNFTCollectionsByCreatorOperationRequestJSON {
  readonly limit: number;
  readonly offset?: number;
  readonly cursor?: string;
  readonly creator_address: AptosAddressJSON;
  readonly network?: AptosNetworkJSON;
}

export const GetNFTCollectionsByCreatorOperation = {
  operationId: "getNFTCollectionsByCreator",
  groupName: "collections",
  httpMethod: "get",
  routePattern: "/collections/creators",
  parameterNames: ["limit","offset","cursor","creator_address","network"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: AptosNFTCollectionsByCreatorResponseJSON): AptosNFTCollectionsByCreatorResponse {
    return AptosNFTCollectionsByCreatorResponse.fromJSON(json);
  },

  serializeRequest(request: GetNFTCollectionsByCreatorOperationRequest): GetNFTCollectionsByCreatorOperationRequestJSON {
    const limit = request.limit;
    const offset = request.offset;
    const cursor = request.cursor;
    const creatorAddress = AptosAddress.create(request.creatorAddress);
    const network = request.network ? AptosNetwork.create(request.network) : undefined;
    return {
      limit: limit,
      offset: offset,
      cursor: cursor,
      creator_address: creatorAddress.toJSON(),
      network: network ? network.toJSON() : undefined,
    };
  },

}
