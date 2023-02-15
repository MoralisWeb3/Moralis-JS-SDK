import { AptosNetwork, AptosNetworkInput, AptosNetworkJSON } from '../../dataTypes';
import { AptosGetAccountModuleResponse, AptosGetAccountModuleResponseJSON } from '../types/AptosGetAccountModuleResponse';

// request parameters:
// - address ($ref: #/paths/~1accounts~1{address}~1modules/get/parameters/0/schema)
// - ledger_version ($ref: #/paths/~1accounts~1{address}~1modules/get/parameters/1/schema)
// - limit ($ref: #/paths/~1accounts~1{address}~1modules/get/parameters/2/schema)
// - start ($ref: #/paths/~1accounts~1{address}~1modules/get/parameters/3/schema)
// - network ($ref: #/virtualParameter/network)

export interface GetAccountModulesOperationRequest {
  /**
   * @description Address of account with or without a 0x prefix
   */
  readonly address: string;
  /**
   * @description Ledger version to get state of account.
   * If not provided, it will be the latest version
   */
  readonly ledgerVersion?: string;
  /**
   * @description Max number of account resources to retrieve.
   * If not provided, defaults to default page size.
   */
  readonly limit?: string;
  /**
   * @description Cursor specifying where to start for pagination
   * This cursor cannot be derived manually client-side. Instead, you must call this endpoint once without this query parameter specified, and then use the cursor returned in the X-Aptos-Cursor header in the response.
   */
  readonly start?: string;
  /**
   * @description The network of query. Defaults to mainnet.
   */
  readonly network?: AptosNetworkInput | AptosNetwork;
}

export interface GetAccountModulesOperationRequestJSON {
  readonly address: string;
  readonly ledger_version?: string;
  readonly limit?: string;
  readonly start?: string;
  readonly network?: AptosNetworkJSON;
}

export const GetAccountModulesOperation = {
  operationId: "getAccountModules",
  groupName: "accounts",
  httpMethod: "get",
  routePattern: "/accounts/{address}/modules",
  parameterNames: ["address","ledger_version","limit","start","network"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: AptosGetAccountModuleResponseJSON[]): AptosGetAccountModuleResponse[] {
    return json.map((item) => AptosGetAccountModuleResponse.fromJSON(item));
  },

  serializeRequest(request: GetAccountModulesOperationRequest): GetAccountModulesOperationRequestJSON {
    const address = request.address;
    const ledgerVersion = request.ledgerVersion;
    const limit = request.limit;
    const start = request.start;
    const network = request.network ? AptosNetwork.create(request.network) : undefined;
    return {
      address: address,
      ledger_version: ledgerVersion,
      limit: limit,
      start: start,
      network: network ? network.toJSON() : undefined,
    };
  },

}
