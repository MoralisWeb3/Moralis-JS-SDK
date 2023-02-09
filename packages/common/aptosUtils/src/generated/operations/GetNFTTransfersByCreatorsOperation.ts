import { AptosAddress, AptosAddressInput, AptosAddressJSON } from '../../dataTypes';
import { AptosGetNFTTransfersByCreatorsResponse, AptosGetNFTTransfersByCreatorsResponseJSON } from '../types/AptosGetNFTTransfersByCreatorsResponse';

// request parameters:
// - limit ($ref: #/paths/~1nfts~1transfers~1creators/get/parameters/0/schema)
// - offset ($ref: #/paths/~1nfts~1transfers~1creators/get/parameters/1/schema)
// - cursor ($ref: #/paths/~1nfts~1transfers~1creators/get/parameters/2/schema)
// - creator_addresses ($ref: #/paths/~1nfts~1transfers~1creators/get/parameters/3/schema)
// - collection_blacklist ($ref: #/paths/~1nfts~1transfers~1creators/get/parameters/4/schema)
// - collection_whitelist ($ref: #/paths/~1nfts~1transfers~1creators/get/parameters/5/schema)

export interface GetNFTTransfersByCreatorsOperationRequest {
  readonly limit: number;
  readonly offset?: number;
  readonly cursor?: string;
  readonly creatorAddresses: AptosAddressInput[] | AptosAddress[];
  readonly collectionBlacklist?: string[];
  readonly collectionWhitelist?: string[];
}

export interface GetNFTTransfersByCreatorsOperationRequestJSON {
  readonly limit: number;
  readonly offset?: number;
  readonly cursor?: string;
  readonly creator_addresses: AptosAddressJSON[];
  readonly collection_blacklist?: string[];
  readonly collection_whitelist?: string[];
}

export const GetNFTTransfersByCreatorsOperation = {
  operationId: "getNFTTransfersByCreators",
  groupName: "nfts",
  httpMethod: "get",
  routePattern: "/nfts/transfers/creators",
  parameterNames: ["limit","offset","cursor","creator_addresses","collection_blacklist","collection_whitelist"],
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
    return {
      limit: limit,
      offset: offset,
      cursor: cursor,
      creator_addresses: creatorAddresses.map((item) => item.toJSON()),
      collection_blacklist: collectionBlacklist,
      collection_whitelist: collectionWhitelist,
    };
  },

}
