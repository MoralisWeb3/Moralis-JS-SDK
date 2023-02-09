import { AptosGetAccountModuleResponse, AptosGetAccountModuleResponseJSON } from '../types/AptosGetAccountModuleResponse';

// request parameters:
// - address ($ref: #/paths/~1accounts~1{address}~1resource~1{module_name}/get/parameters/0/schema)
// - module_name ($ref: #/paths/~1accounts~1{address}~1resource~1{module_name}/get/parameters/1/schema)
// - ledger_version ($ref: #/paths/~1accounts~1{address}~1resource~1{module_name}/get/parameters/2/schema)

export interface GetAccountModuleOperationRequest {
  readonly address: string;
  readonly moduleName: string;
  readonly ledgerVersion?: string;
}

export interface GetAccountModuleOperationRequestJSON {
  readonly address: string;
  readonly module_name: string;
  readonly ledger_version?: string;
}

export const GetAccountModuleOperation = {
  operationId: "getAccountModule",
  groupName: "accounts",
  httpMethod: "get",
  routePattern: "/accounts/{address}/resource/{module_name}",
  parameterNames: ["address","module_name","ledger_version"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: AptosGetAccountModuleResponseJSON): AptosGetAccountModuleResponse {
    return AptosGetAccountModuleResponse.fromJSON(json);
  },

  serializeRequest(request: GetAccountModuleOperationRequest): GetAccountModuleOperationRequestJSON {
    const address = request.address;
    const moduleName = request.moduleName;
    const ledgerVersion = request.ledgerVersion;
    return {
      address: address,
      module_name: moduleName,
      ledger_version: ledgerVersion,
    };
  },

}
