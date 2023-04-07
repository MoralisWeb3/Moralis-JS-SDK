import { AptosNetwork, AptosNetworkInput, AptosNetworkJSON } from '../../dataTypes';
import { AptosGetAccountModuleResponse, AptosGetAccountModuleResponseJSON } from '../types/AptosGetAccountModuleResponse';

// request parameters:
// - address ($ref: #/paths/~1accounts~1{address}~1resource~1{module_name}/get/parameters/0/schema)
// - module_name ($ref: #/paths/~1accounts~1{address}~1resource~1{module_name}/get/parameters/1/schema)
// - ledger_version ($ref: #/paths/~1accounts~1{address}~1resource~1{module_name}/get/parameters/2/schema)
// - network ($ref: #/virtualParameter/network)

export interface GetAccountModuleOperationRequest {
  /**
   * @description Address of account with or without a 0x prefix
   */
  readonly address: string;
  /**
   * @description Name of module to retrieve
   */
  readonly moduleName: string;
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

export interface GetAccountModuleOperationRequestJSON {
  readonly address: string;
  readonly module_name: string;
  readonly ledger_version?: string;
  readonly network?: AptosNetworkJSON;
}

export const GetAccountModuleOperation = {
  operationId: "getAccountModule",
  groupName: "accounts",
  httpMethod: "get",
  routePattern: "/accounts/{address}/resource/{module_name}",
  parameterNames: ["address","moduleName","ledgerVersion","network"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: AptosGetAccountModuleResponseJSON): AptosGetAccountModuleResponse {
    return AptosGetAccountModuleResponse.fromJSON(json);
  },

  serializeRequest(request: GetAccountModuleOperationRequest): GetAccountModuleOperationRequestJSON {
    const address = request.address;
    const moduleName = request.moduleName;
    const ledgerVersion = request.ledgerVersion;
    const network = request.network ? AptosNetwork.create(request.network) : undefined;
    return {
      address: address,
      module_name: moduleName,
      ledger_version: ledgerVersion,
      network: network ? network.toJSON() : undefined,
    };
  },

}
