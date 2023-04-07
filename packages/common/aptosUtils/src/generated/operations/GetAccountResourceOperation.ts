import { AptosNetwork, AptosNetworkInput, AptosNetworkJSON } from '../../dataTypes';
import { AptosGetAccountResourceResponse, AptosGetAccountResourceResponseJSON } from '../types/AptosGetAccountResourceResponse';

// request parameters:
// - address ($ref: #/paths/~1accounts~1{address}~1resource~1{resource_type}/get/parameters/0/schema)
// - resource_type ($ref: #/paths/~1accounts~1{address}~1resource~1{resource_type}/get/parameters/1/schema)
// - ledger_version ($ref: #/paths/~1accounts~1{address}~1resource~1{resource_type}/get/parameters/2/schema)
// - network ($ref: #/virtualParameter/network)

export interface GetAccountResourceOperationRequest {
  /**
   * @description Address of account with or without a 0x prefix
   */
  readonly address: string;
  /**
   * @description Name of struct to retrieve e.g. 0x1::account::Account
   */
  readonly resourceType: string;
  /**
   * @description Ledger version to get state of account.
   * If not provided, it will be the latest version
   */
  readonly ledgerVersion?: string;
  /**
   * @description The network of query. Defaults to mainnet.
   */
  readonly network?: AptosNetworkInput | AptosNetwork;
}

export interface GetAccountResourceOperationRequestJSON {
  readonly address: string;
  readonly resource_type: string;
  readonly ledger_version?: string;
  readonly network?: AptosNetworkJSON;
}

export const GetAccountResourceOperation = {
  operationId: "getAccountResource",
  groupName: "accounts",
  httpMethod: "get",
  routePattern: "/accounts/{address}/resource/{resource_type}",
  parameterNames: ["address","resourceType","ledgerVersion","network"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: AptosGetAccountResourceResponseJSON): AptosGetAccountResourceResponse {
    return AptosGetAccountResourceResponse.fromJSON(json);
  },

  serializeRequest(request: GetAccountResourceOperationRequest): GetAccountResourceOperationRequestJSON {
    const address = request.address;
    const resourceType = request.resourceType;
    const ledgerVersion = request.ledgerVersion;
    const network = request.network ? AptosNetwork.create(request.network) : undefined;
    return {
      address: address,
      resource_type: resourceType,
      ledger_version: ledgerVersion,
      network: network ? network.toJSON() : undefined,
    };
  },

}
