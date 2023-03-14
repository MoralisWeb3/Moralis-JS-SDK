import { AptosAddress, AptosAddressInput, AptosAddressJSON, AptosNetwork, AptosNetworkInput, AptosNetworkJSON } from '../../dataTypes';
import { AptosGetNFTTransfersByCreatorsResponse, AptosGetNFTTransfersByCreatorsResponseJSON } from '../types/AptosGetNFTTransfersByCreatorsResponse';

// request parameters:
// - limit ($ref: #/paths/~1nfts~1transfers~1creators/get/parameters/0/schema)
// - offset ($ref: #/paths/~1nfts~1transfers~1creators/get/parameters/1/schema)
// - cursor ($ref: #/paths/~1nfts~1transfers~1creators/get/parameters/2/schema)
// - creator_addresses ($ref: #/paths/~1nfts~1transfers~1creators/get/parameters/3/schema)
// - collection_blacklist ($ref: #/paths/~1nfts~1transfers~1creators/get/parameters/4/schema)
// - collection_whitelist ($ref: #/paths/~1nfts~1transfers~1creators/get/parameters/5/schema)
// - network ($ref: #/virtualParameter/network)

export interface GetNFTTransfersByCreatorsOperationRequest {
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
   * @description The addresses of the creators
   */
  readonly creatorAddresses: AptosAddressInput[] | AptosAddress[];
  /**
   * @description The ids of the collections to whitelist
   */
  readonly collectionBlacklist?: string[];
  /**
   * @description The ids of the collections to whitelist
   */
  readonly collectionWhitelist?: string[];
  /**
   * @description The network of query. Defaults to mainnet.
   */
  readonly network?: AptosNetworkInput | AptosNetwork;
}

export interface GetNFTTransfersByCreatorsOperationRequestJSON {
  readonly limit: number;
  readonly offset?: number;
  readonly cursor?: string;
  readonly creator_addresses: AptosAddressJSON[];
  readonly collection_blacklist?: string[];
  readonly collection_whitelist?: string[];
  readonly network?: AptosNetworkJSON;
}

export const GetNFTTransfersByCreatorsOperation = {
  operationId: "getNFTTransfersByCreators",
  groupName: "nfts",
  httpMethod: "get",
  routePattern: "/nfts/transfers/creators",
  parameterNames: ["limit","offset","cursor","creator_addresses","collection_blacklist","collection_whitelist","network"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: AptosGetNFTTransfersByCreatorsResponseJSON): AptosGetNFTTransfersByCreatorsResponse {
    return AptosGetNFTTransfersByCreatorsResponse.fromJSON(json);
  },

  serializeRequest(request: GetNFTTransfersByCreatorsOperationRequest): GetNFTTransfersByCreatorsOperationRequestJSON {
    const limit = request.limit;
    const offset = request.offset;
    const cursor = request.cursor;
    const creatorAddresses = request.creatorAddresses.map((item) => AptosAddress.create(item));
    const collectionBlacklist = request.collectionBlacklist;
    const collectionWhitelist = request.collectionWhitelist;
    const network = request.network ? AptosNetwork.create(request.network) : undefined;
    return {
      limit: limit,
      offset: offset,
      cursor: cursor,
      creator_addresses: creatorAddresses.map((item) => item.toJSON()),
      collection_blacklist: collectionBlacklist,
      collection_whitelist: collectionWhitelist,
      network: network ? network.toJSON() : undefined,
    };
  },

}
