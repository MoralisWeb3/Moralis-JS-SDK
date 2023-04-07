import { AptosNetwork, AptosNetworkInput, AptosNetworkJSON } from '../../dataTypes';
import { AptosGetAccountResponse, AptosGetAccountResponseJSON } from '../types/AptosGetAccountResponse';

// request parameters:
// - address ($ref: #/paths/~1accounts~1{address}/get/parameters/0/schema)
// - ledger_version ($ref: #/paths/~1accounts~1{address}/get/parameters/1/schema)
// - network ($ref: #/virtualParameter/network)

export interface GetAccountOperationRequest {
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
   * @description The network of query. Defaults to mainnet.
   */
  readonly network?: AptosNetworkInput | AptosNetwork;
}

export interface GetAccountOperationRequestJSON {
  readonly address: string;
  readonly ledger_version?: string;
  readonly network?: AptosNetworkJSON;
}

export const GetAccountOperation = {
  operationId: "getAccount",
  groupName: "accounts",
  httpMethod: "get",
  routePattern: "/accounts/{address}",
  parameterNames: ["address","ledgerVersion","network"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: AptosGetAccountResponseJSON): AptosGetAccountResponse {
    return AptosGetAccountResponse.fromJSON(json);
  },

  serializeRequest(request: GetAccountOperationRequest): GetAccountOperationRequestJSON {
    const address = request.address;
    const ledgerVersion = request.ledgerVersion;
    const network = request.network ? AptosNetwork.create(request.network) : undefined;
    return {
      address: address,
      ledger_version: ledgerVersion,
      network: network ? network.toJSON() : undefined,
    };
  },

}
