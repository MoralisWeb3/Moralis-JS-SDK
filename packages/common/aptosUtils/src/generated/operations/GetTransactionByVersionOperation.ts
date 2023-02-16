import { AptosNetwork, AptosNetworkInput, AptosNetworkJSON } from '../../dataTypes';
import { AptosGetTransactionByVersion, AptosGetTransactionByVersionJSON } from '../types/AptosGetTransactionByVersion';

// request parameters:
// - txn_version ($ref: #/paths/~1transactions~1by_version~1{txn_version}/get/parameters/0/schema)
// - network ($ref: #/virtualParameter/network)

export interface GetTransactionByVersionOperationRequest {
  /**
   * @description Version of transaction to retrieve
   */
  readonly txnVersion: string;
  /**
   * @description The network of query. Defaults to mainnet.
   */
  readonly network?: AptosNetworkInput | AptosNetwork;
}

export interface GetTransactionByVersionOperationRequestJSON {
  readonly txn_version: string;
  readonly network?: AptosNetworkJSON;
}

export const GetTransactionByVersionOperation = {
  operationId: "getTransactionByVersion",
  groupName: "transactions",
  httpMethod: "get",
  routePattern: "/transactions/by_version/{txn_version}",
  parameterNames: ["txn_version","network"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: AptosGetTransactionByVersionJSON): AptosGetTransactionByVersion {
    return AptosGetTransactionByVersion.fromJSON(json);
  },

  serializeRequest(request: GetTransactionByVersionOperationRequest): GetTransactionByVersionOperationRequestJSON {
    const txnVersion = request.txnVersion;
    const network = request.network ? AptosNetwork.create(request.network) : undefined;
    return {
      txn_version: txnVersion,
      network: network ? network.toJSON() : undefined,
    };
  },

}
