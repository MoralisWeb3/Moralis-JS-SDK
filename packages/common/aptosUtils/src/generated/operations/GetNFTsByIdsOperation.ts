import { AptosNetwork, AptosNetworkInput, AptosNetworkJSON } from '../../dataTypes';
import { AptosNFTTokenResponse, AptosNFTTokenResponseJSON } from '../types/AptosNFTTokenResponse';

// request parameters:
// - token_ids ($ref: #/paths/~1nfts/get/parameters/0/schema)
// - network ($ref: #/virtualParameter/network)

export interface GetNFTsByIdsOperationRequest {
  /**
   * @description The identifiers of the tokens to get
   */
  readonly tokenIds: string[];
  /**
   * @description The network of query. Defaults to mainnet.
   */
  readonly network?: AptosNetworkInput | AptosNetwork;
}

export interface GetNFTsByIdsOperationRequestJSON {
  readonly token_ids: string[];
  readonly network?: AptosNetworkJSON;
}

export const GetNFTsByIdsOperation = {
  operationId: "getNFTsByIds",
  groupName: "nfts",
  httpMethod: "get",
  routePattern: "/nfts",
  parameterNames: ["tokenIds","network"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: AptosNFTTokenResponseJSON[]): AptosNFTTokenResponse[] {
    return json.map((item) => AptosNFTTokenResponse.fromJSON(item));
  },

  serializeRequest(request: GetNFTsByIdsOperationRequest): GetNFTsByIdsOperationRequestJSON {
    const tokenIds = request.tokenIds;
    const network = request.network ? AptosNetwork.create(request.network) : undefined;
    return {
      token_ids: tokenIds,
      network: network ? network.toJSON() : undefined,
    };
  },

}
