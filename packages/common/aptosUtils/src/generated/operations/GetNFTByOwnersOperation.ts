import { AptosAddress, AptosAddressInput, AptosAddressJSON, AptosNetwork, AptosNetworkInput, AptosNetworkJSON } from '../../dataTypes';
import { AptosNFTsByOwnersResponse, AptosNFTsByOwnersResponseJSON } from '../types/AptosNFTsByOwnersResponse';

// request parameters:
// - limit ($ref: #/paths/~1wallets~1nfts/get/parameters/0/schema)
// - offset ($ref: #/paths/~1wallets~1nfts/get/parameters/1/schema)
// - cursor ($ref: #/paths/~1wallets~1nfts/get/parameters/2/schema)
// - owner_addresses ($ref: #/paths/~1wallets~1nfts/get/parameters/3/schema)
// - collection_blacklist ($ref: #/paths/~1wallets~1nfts/get/parameters/4/schema)
// - collection_whitelist ($ref: #/paths/~1wallets~1nfts/get/parameters/5/schema)
// - network ($ref: #/virtualParameter/network)

export interface GetNFTByOwnersOperationRequest {
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
   * @description The addresses of the owners to get tokens for
   */
  readonly ownerAddresses: AptosAddressInput[] | AptosAddress[];
  /**
   * @description The collection data id hashes of the collections to whitelist
   */
  readonly collectionBlacklist?: string[];
  /**
   * @description The collection data id hashes of the collections to whitelist
   */
  readonly collectionWhitelist?: string[];
  /**
   * @description The network of query. Defaults to mainnet.
   */
  readonly network?: AptosNetworkInput | AptosNetwork;
}

export interface GetNFTByOwnersOperationRequestJSON {
  readonly limit: number;
  readonly offset?: number;
  readonly cursor?: string;
  readonly owner_addresses: AptosAddressJSON[];
  readonly collection_blacklist?: string[];
  readonly collection_whitelist?: string[];
  readonly network?: AptosNetworkJSON;
}

export const GetNFTByOwnersOperation = {
  operationId: "getNFTByOwners",
  groupName: "wallets",
  httpMethod: "get",
  routePattern: "/wallets/nfts",
  parameterNames: ["limit","offset","cursor","owner_addresses","collection_blacklist","collection_whitelist","network"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: AptosNFTsByOwnersResponseJSON): AptosNFTsByOwnersResponse {
    return AptosNFTsByOwnersResponse.fromJSON(json);
  },

  serializeRequest(request: GetNFTByOwnersOperationRequest): GetNFTByOwnersOperationRequestJSON {
    const limit = request.limit;
    const offset = request.offset;
    const cursor = request.cursor;
    const ownerAddresses = request.ownerAddresses.map((item) => AptosAddress.create(item));
    const collectionBlacklist = request.collectionBlacklist;
    const collectionWhitelist = request.collectionWhitelist;
    const network = request.network ? AptosNetwork.create(request.network) : undefined;
    return {
      limit: limit,
      offset: offset,
      cursor: cursor,
      owner_addresses: ownerAddresses.map((item) => item.toJSON()),
      collection_blacklist: collectionBlacklist,
      collection_whitelist: collectionWhitelist,
      network: network ? network.toJSON() : undefined,
    };
  },

}
