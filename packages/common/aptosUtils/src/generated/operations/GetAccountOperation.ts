import { AptosGetAccountResponse, AptosGetAccountResponseJSON } from '../types/AptosGetAccountResponse';

// request parameters:
// - address ($ref: #/paths/~1accounts~1{address}/get/parameters/0/schema)
// - ledger_version ($ref: #/paths/~1accounts~1{address}/get/parameters/1/schema)

export interface GetAccountOperationRequest {
  readonly address: string;
  readonly ledgerVersion?: string;
}

export interface GetAccountOperationRequestJSON {
  readonly address: string;
  readonly ledger_version?: string;
}

export const GetAccountOperation = {
  operationId: "getAccount",
  groupName: "accounts",
  httpMethod: "get",
  routePattern: "/accounts/{address}",
  parameterNames: ["address","ledger_version"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: AptosGetAccountResponseJSON): AptosGetAccountResponse {
    return AptosGetAccountResponse.fromJSON(json);
  },

  serializeRequest(request: GetAccountOperationRequest): GetAccountOperationRequestJSON {
    const address = request.address;
    const ledgerVersion = request.ledgerVersion;
    return {
      address: address,
      ledger_version: ledgerVersion,
    };
  },

}
