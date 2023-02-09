import { AptosAddress, AptosAddressInput, AptosAddressJSON } from '../../dataTypes';
import { AptosNFTCollectionsByCreatorResponse, AptosNFTCollectionsByCreatorResponseJSON } from '../types/AptosNFTCollectionsByCreatorResponse';

// request parameters:
// - limit ($ref: #/paths/~1collections~1creators/get/parameters/0/schema)
// - offset ($ref: #/paths/~1collections~1creators/get/parameters/1/schema)
// - cursor ($ref: #/paths/~1collections~1creators/get/parameters/2/schema)
// - creator_address ($ref: #/paths/~1collections~1creators/get/parameters/3/schema)

export interface GetNFTCollectionsByCreatorOperationRequest {
  readonly limit: number;
  readonly offset?: number;
  readonly cursor?: string;
  readonly creatorAddress: AptosAddressInput | AptosAddress;
}

export interface GetNFTCollectionsByCreatorOperationRequestJSON {
  readonly limit: number;
  readonly offset?: number;
  readonly cursor?: string;
  readonly creator_address: AptosAddressJSON;
}

export const GetNFTCollectionsByCreatorOperation = {
  operationId: "getNFTCollectionsByCreator",
  groupName: "collections",
  httpMethod: "get",
  routePattern: "/collections/creators",
  parameterNames: ["limit","offset","cursor","creator_address"],
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
    return {
      limit: limit,
      offset: offset,
      cursor: cursor,
      creator_address: creatorAddress.toJSON(),
    };
  },

}
