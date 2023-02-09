import { AptosGetAccountResourceResponse, AptosGetAccountResourceResponseJSON } from '../types/AptosGetAccountResourceResponse';

// request parameters:
// - address ($ref: #/paths/~1accounts~1{address}~1resources/get/parameters/0/schema)
// - ledger_version ($ref: #/paths/~1accounts~1{address}~1resources/get/parameters/1/schema)
// - limit ($ref: #/paths/~1accounts~1{address}~1resources/get/parameters/2/schema)
// - start ($ref: #/paths/~1accounts~1{address}~1resources/get/parameters/3/schema)

export interface GetAccountResourcesOperationRequest {
  readonly address: string;
  readonly ledgerVersion?: string;
  readonly limit?: string;
  readonly start?: string;
}

export interface GetAccountResourcesOperationRequestJSON {
  readonly address: string;
  readonly ledger_version?: string;
  readonly limit?: string;
  readonly start?: string;
}

export const GetAccountResourcesOperation = {
  operationId: "getAccountResources",
  groupName: "accounts",
  httpMethod: "get",
  routePattern: "/accounts/{address}/resources",
  parameterNames: ["address","ledger_version","limit","start"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: AptosGetAccountResourceResponseJSON[]): AptosGetAccountResourceResponse[] {
    return json.map((item) => AptosGetAccountResourceResponse.fromJSON(item));
  },

  serializeRequest(request: GetAccountResourcesOperationRequest): GetAccountResourcesOperationRequestJSON {
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
