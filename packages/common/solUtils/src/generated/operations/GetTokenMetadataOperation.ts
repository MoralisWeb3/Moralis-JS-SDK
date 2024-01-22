import { SolNetwork, SolNetworkInput, SolNetworkJSON, SolAddress, SolAddressInput, SolAddressJSON } from '../../dataTypes';
import { SolTokenMetadata, SolTokenMetadataJSON } from '../types/SolTokenMetadata';

// request parameters:
// - network ($ref: #/paths/~1token~1{network}~1{address}~1metadata/get/parameters/0/schema)
// - address ($ref: #/paths/~1token~1{network}~1{address}~1metadata/get/parameters/1/schema)

export interface GetTokenMetadataOperationRequest {
  /**
   * @description The network to query
   */
  readonly network: SolNetworkInput | SolNetwork;
  /**
   * @description The address of the contract
   */
  readonly address: SolAddressInput | SolAddress;
}

export interface GetTokenMetadataOperationRequestJSON {
  readonly network: SolNetworkJSON;
  readonly address: SolAddressJSON;
}

export type GetTokenMetadataOperationResponse = SolTokenMetadata;
export type GetTokenMetadataOperationResponseJSON = SolTokenMetadataJSON;

export const GetTokenMetadataOperation = {
  operationId: "getTokenMetadata",
  groupName: "token",
  httpMethod: "get",
  routePattern: "/token/{network}/{address}/metadata",
  parameterNames: ["network","address"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: SolTokenMetadataJSON): SolTokenMetadata {
    return SolTokenMetadata.fromJSON(json);
  },

  serializeRequest(request: GetTokenMetadataOperationRequest): GetTokenMetadataOperationRequestJSON {
    const network = SolNetwork.create(request.network);
    const address = SolAddress.create(request.address);
    return {
      network: network.toJSON(),
      address: address.toJSON(),
    };
  },

}
