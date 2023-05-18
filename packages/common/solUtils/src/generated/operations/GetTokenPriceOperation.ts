import { SolNetwork, SolNetworkInput, SolNetworkJSON, SolAddress, SolAddressInput, SolAddressJSON } from '../../dataTypes';
import { SolSPLTokenPrice, SolSPLTokenPriceJSON } from '../types/SolSPLTokenPrice';

// request parameters:
// - network ($ref: #/paths/~1token~1{network}~1{address}~1price/get/parameters/0/schema)
// - address ($ref: #/paths/~1token~1{network}~1{address}~1price/get/parameters/1/schema)

export interface GetTokenPriceOperationRequest {
  /**
   * @description The network to query
   */
  readonly network: SolNetworkInput | SolNetwork;
  /**
   * @description The address of the token contract
   */
  readonly address: SolAddressInput | SolAddress;
}

export interface GetTokenPriceOperationRequestJSON {
  readonly network: SolNetworkJSON;
  readonly address: SolAddressJSON;
}

export type GetTokenPriceOperationResponse = SolSPLTokenPrice;
export type GetTokenPriceOperationResponseJSON = SolSPLTokenPriceJSON;

export const GetTokenPriceOperation = {
  operationId: "getTokenPrice",
  groupName: "token",
  httpMethod: "get",
  routePattern: "/token/{network}/{address}/price",
  parameterNames: ["network","address"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: SolSPLTokenPriceJSON): SolSPLTokenPrice {
    return SolSPLTokenPrice.fromJSON(json);
  },

  serializeRequest(request: GetTokenPriceOperationRequest): GetTokenPriceOperationRequestJSON {
    const network = SolNetwork.create(request.network);
    const address = SolAddress.create(request.address);
    return {
      network: network.toJSON(),
      address: address.toJSON(),
    };
  },

}
