import { AptosGetAccountResourceResponse, AptosGetAccountResourceResponseJSON } from '../types/AptosGetAccountResourceResponse';

// request parameters:
// - address ($ref: #/paths/~1accounts~1{address}~1resource~1{resource_type}/get/parameters/0/schema)
// - resource_type ($ref: #/paths/~1accounts~1{address}~1resource~1{resource_type}/get/parameters/1/schema)
// - ledger_version ($ref: #/paths/~1accounts~1{address}~1resource~1{resource_type}/get/parameters/2/schema)

export interface GetAccountResourceOperationRequest {
  readonly address: string;
  readonly resourceType: string;
  readonly ledgerVersion?: string;
}

export interface GetAccountResourceOperationRequestJSON {
  readonly address: string;
  readonly resource_type: string;
  readonly ledger_version?: string;
}

export const GetAccountResourceOperation = {
  operationId: "getAccountResource",
  groupName: "accounts",
  httpMethod: "get",
  routePattern: "/accounts/{address}/resource/{resource_type}",
  parameterNames: ["address","resource_type","ledger_version"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: AptosGetAccountResourceResponseJSON): AptosGetAccountResourceResponse {
    return AptosGetAccountResourceResponse.fromJSON(json);
  },

  serializeRequest(request: GetAccountResourceOperationRequest): GetAccountResourceOperationRequestJSON {
    const address = request.address;
    const resourceType = request.resourceType;
    const ledgerVersion = request.ledgerVersion;
    return {
      address: address,
      resource_type: resourceType,
      ledger_version: ledgerVersion,
    };
  },

}
