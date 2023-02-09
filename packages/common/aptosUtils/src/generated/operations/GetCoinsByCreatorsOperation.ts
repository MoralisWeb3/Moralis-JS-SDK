import { AptosAddress, AptosAddressInput, AptosAddressJSON } from '../../dataTypes';
import { AptosGetCoinsByCreatorsResponse, AptosGetCoinsByCreatorsResponseJSON } from '../types/AptosGetCoinsByCreatorsResponse';

// request parameters:
// - limit ($ref: #/paths/~1coins~1creators/get/parameters/0/schema)
// - offset ($ref: #/paths/~1coins~1creators/get/parameters/1/schema)
// - cursor ($ref: #/paths/~1coins~1creators/get/parameters/2/schema)
// - creator_addresses ($ref: #/paths/~1coins~1creators/get/parameters/3/schema)

export interface GetCoinsByCreatorsOperationRequest {
  readonly limit: number;
  readonly offset?: number;
  readonly cursor?: string;
  readonly creatorAddresses: AptosAddressInput[] | AptosAddress[];
}

export interface GetCoinsByCreatorsOperationRequestJSON {
  readonly limit: number;
  readonly offset?: number;
  readonly cursor?: string;
  readonly creator_addresses: AptosAddressJSON[];
}

export const GetCoinsByCreatorsOperation = {
  operationId: "getCoinsByCreators",
  groupName: "coins",
  httpMethod: "get",
  routePattern: "/coins/creators",
  parameterNames: ["limit","offset","cursor","creator_addresses"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: AptosGetCoinsByCreatorsResponseJSON): AptosGetCoinsByCreatorsResponse {
    return AptosGetCoinsByCreatorsResponse.fromJSON(json);
  },

  serializeRequest(request: GetCoinsByCreatorsOperationRequest): GetCoinsByCreatorsOperationRequestJSON {
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
