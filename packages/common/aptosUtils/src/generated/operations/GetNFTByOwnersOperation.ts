import { AptosAddress, AptosAddressInput, AptosAddressJSON } from '../../dataTypes';
import { AptosNFTsByOwnersResponse, AptosNFTsByOwnersResponseJSON } from '../types/AptosNFTsByOwnersResponse';

// request parameters:
// - limit ($ref: #/paths/~1wallets~1nfts/get/parameters/0/schema)
// - offset ($ref: #/paths/~1wallets~1nfts/get/parameters/1/schema)
// - cursor ($ref: #/paths/~1wallets~1nfts/get/parameters/2/schema)
// - owner_addresses ($ref: #/paths/~1wallets~1nfts/get/parameters/3/schema)
// - collection_blacklist ($ref: #/paths/~1wallets~1nfts/get/parameters/4/schema)
// - collection_whitelist ($ref: #/paths/~1wallets~1nfts/get/parameters/5/schema)

export interface GetNFTByOwnersOperationRequest {
  readonly limit: number;
  readonly offset?: number;
  readonly cursor?: string;
  readonly ownerAddresses: AptosAddressInput[] | AptosAddress[];
  readonly collectionBlacklist?: string[];
  readonly collectionWhitelist?: string[];
}

export interface GetNFTByOwnersOperationRequestJSON {
  readonly limit: number;
  readonly offset?: number;
  readonly cursor?: string;
  readonly owner_addresses: AptosAddressJSON[];
  readonly collection_blacklist?: string[];
  readonly collection_whitelist?: string[];
}

export const GetNFTByOwnersOperation = {
  operationId: "getNFTByOwners",
  groupName: "wallets",
  httpMethod: "get",
  routePattern: "/wallets/nfts",
  parameterNames: ["limit","offset","cursor","owner_addresses","collection_blacklist","collection_whitelist"],
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
    return {
      limit: limit,
      offset: offset,
      cursor: cursor,
      owner_addresses: ownerAddresses.map((item) => item.toJSON()),
      collection_blacklist: collectionBlacklist,
      collection_whitelist: collectionWhitelist,
    };
  },

}
