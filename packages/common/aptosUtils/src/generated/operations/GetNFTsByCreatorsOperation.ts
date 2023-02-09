import { AptosAddress, AptosAddressInput, AptosAddressJSON } from '../../dataTypes';
import { AptosNFTTokensByCreatorsResponse, AptosNFTTokensByCreatorsResponseJSON } from '../types/AptosNFTTokensByCreatorsResponse';

// request parameters:
// - limit ($ref: #/paths/~1nfts~1creators/get/parameters/0/schema)
// - offset ($ref: #/paths/~1nfts~1creators/get/parameters/1/schema)
// - cursor ($ref: #/paths/~1nfts~1creators/get/parameters/2/schema)
// - creator_addresses ($ref: #/paths/~1nfts~1creators/get/parameters/3/schema)

export interface GetNFTsByCreatorsOperationRequest {
  readonly limit: number;
  readonly offset?: number;
  readonly cursor?: string;
  readonly creatorAddresses: AptosAddressInput[] | AptosAddress[];
}

export interface GetNFTsByCreatorsOperationRequestJSON {
  readonly limit: number;
  readonly offset?: number;
  readonly cursor?: string;
  readonly creator_addresses: AptosAddressJSON[];
}

export const GetNFTsByCreatorsOperation = {
  operationId: "getNFTsByCreators",
  groupName: "nfts",
  httpMethod: "get",
  routePattern: "/nfts/creators",
  parameterNames: ["limit","offset","cursor","creator_addresses"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: AptosNFTTokensByCreatorsResponseJSON): AptosNFTTokensByCreatorsResponse {
    return AptosNFTTokensByCreatorsResponse.fromJSON(json);
  },

  serializeRequest(request: GetNFTsByCreatorsOperationRequest): GetNFTsByCreatorsOperationRequestJSON {
    const limit = request.limit;
    const offset = request.offset;
    const cursor = request.cursor;
    const creatorAddresses = request.creatorAddresses.map((item) => AptosAddress.create(item));
    return {
      limit: limit,
      offset: offset,
      cursor: cursor,
      creator_addresses: creatorAddresses.map((item) => item.toJSON()),
    };
  },

}
