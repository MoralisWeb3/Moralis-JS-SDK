import { AptosGetAccountModuleResponse, AptosGetAccountModuleResponseJSON } from '../types/AptosGetAccountModuleResponse';

// request parameters:
// - address ($ref: #/paths/~1accounts~1{address}~1modules/get/parameters/0/schema)
// - ledger_version ($ref: #/paths/~1accounts~1{address}~1modules/get/parameters/1/schema)
// - limit ($ref: #/paths/~1accounts~1{address}~1modules/get/parameters/2/schema)
// - start ($ref: #/paths/~1accounts~1{address}~1modules/get/parameters/3/schema)

export interface GetAccountModulesOperationRequest {
  readonly address: string;
  readonly ledgerVersion?: string;
  readonly limit?: string;
  readonly start?: string;
}

export interface GetAccountModulesOperationRequestJSON {
  readonly address: string;
  readonly ledger_version?: string;
  readonly limit?: string;
  readonly start?: string;
}

export const GetAccountModulesOperation = {
  operationId: "getAccountModules",
  groupName: "accounts",
  httpMethod: "get",
  routePattern: "/accounts/{address}/modules",
  parameterNames: ["address","ledger_version","limit","start"],
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
    return {
      address: address,
      ledger_version: ledgerVersion,
      limit: limit,
      start: start,
    };
  },

}
