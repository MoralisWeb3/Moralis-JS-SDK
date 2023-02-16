import { AptosNetwork, AptosNetworkInput, AptosNetworkJSON } from '../../dataTypes';
import { AptosGetTransactionByHash, AptosGetTransactionByHashJSON } from '../types/AptosGetTransactionByHash';

// request parameters:
// - txn_hash ($ref: #/paths/~1transactions~1by_hash~1{txn_hash}/get/parameters/0/schema)
// - network ($ref: #/virtualParameter/network)

export interface GetTransactionByHashOperationRequest {
  /**
   * @description Hash of transaction to retrieve
   */
  readonly txnHash: string;
  /**
   * @description The network of query. Defaults to mainnet.
   */
  readonly network?: AptosNetworkInput | AptosNetwork;
}

export interface GetTransactionByHashOperationRequestJSON {
  readonly txn_hash: string;
  readonly network?: AptosNetworkJSON;
}

export const GetTransactionByHashOperation = {
  operationId: "getTransactionByHash",
  groupName: "transactions",
  httpMethod: "get",
  routePattern: "/transactions/by_hash/{txn_hash}",
  parameterNames: ["txn_hash","network"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: AptosGetTransactionByHashJSON): AptosGetTransactionByHash {
    return AptosGetTransactionByHash.fromJSON(json);
  },

  serializeRequest(request: GetTransactionByHashOperationRequest): GetTransactionByHashOperationRequestJSON {
    const txnHash = request.txnHash;
    const network = request.network ? AptosNetwork.create(request.network) : undefined;
    return {
      txn_hash: txnHash,
      network: network ? network.toJSON() : undefined,
    };
  },

}
