import { AptosAddress, AptosAddressInput, AptosAddressJSON, AptosNetwork, AptosNetworkInput, AptosNetworkJSON } from '../../dataTypes';
import { AptosNFTTokensByCreatorsResponse, AptosNFTTokensByCreatorsResponseJSON } from '../types/AptosNFTTokensByCreatorsResponse';

// request parameters:
// - limit ($ref: #/paths/~1nfts~1creators/get/parameters/0/schema)
// - offset ($ref: #/paths/~1nfts~1creators/get/parameters/1/schema)
// - cursor ($ref: #/paths/~1nfts~1creators/get/parameters/2/schema)
// - creator_addresses ($ref: #/paths/~1nfts~1creators/get/parameters/3/schema)
// - network ($ref: #/virtualParameter/network)

export interface GetNFTsByCreatorsOperationRequest {
  /**
   * @description The number of tokens to return
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
   * @description The network of query. Defaults to mainnet.
   */
  readonly network?: AptosNetworkInput | AptosNetwork;
}

export interface GetNFTsByCreatorsOperationRequestJSON {
  readonly limit: number;
  readonly offset?: number;
  readonly cursor?: string;
  readonly creator_addresses: AptosAddressJSON[];
  readonly network?: AptosNetworkJSON;
}

export const GetNFTsByCreatorsOperation = {
  operationId: "getNFTsByCreators",
  groupName: "nfts",
  httpMethod: "get",
  routePattern: "/nfts/creators",
  parameterNames: ["limit","offset","cursor","creatorAddresses","network"],
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
    const network = request.network ? AptosNetwork.create(request.network) : undefined;
    return {
      limit: limit,
      offset: offset,
      cursor: cursor,
      creator_addresses: creatorAddresses.map((item) => item.toJSON()),
      network: network ? network.toJSON() : undefined,
    };
  },

}
