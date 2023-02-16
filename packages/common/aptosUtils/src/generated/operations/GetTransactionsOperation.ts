import { AptosNetwork, AptosNetworkInput, AptosNetworkJSON } from '../../dataTypes';
import { AptosGetTransactionsItem, AptosGetTransactionsItemJSON } from '../types/AptosGetTransactionsItem';

// request parameters:
// - limit ($ref: #/paths/~1transactions/get/parameters/0/schema)
// - start ($ref: #/paths/~1transactions/get/parameters/1/schema)
// - network ($ref: #/virtualParameter/network)

export interface GetTransactionsOperationRequest {
  /**
   * @description Max number of transactions to retrieve.
   * If not provided, defaults to default page size
   */
  readonly limit?: number;
  /**
   * @description Account sequence number to start list of transactions.
   * If not provided, defaults to showing the latest transactions
   */
  readonly start?: string;
  /**
   * @description The network of query. Defaults to mainnet.
   */
  readonly network?: AptosNetworkInput | AptosNetwork;
}

export interface GetTransactionsOperationRequestJSON {
  readonly limit?: number;
  readonly start?: string;
  readonly network?: AptosNetworkJSON;
}

export const GetTransactionsOperation = {
  operationId: "getTransactions",
  groupName: "transactions",
  httpMethod: "get",
  routePattern: "/transactions",
  parameterNames: ["limit","start","network"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: AptosGetTransactionsItemJSON[]): AptosGetTransactionsItem[] {
    return json.map((item) => AptosGetTransactionsItem.fromJSON(item));
  },

  serializeRequest(request: GetTransactionsOperationRequest): GetTransactionsOperationRequestJSON {
    const limit = request.limit;
    const start = request.start;
    const network = request.network ? AptosNetwork.create(request.network) : undefined;
    return {
      limit: limit,
      start: start,
      network: network ? network.toJSON() : undefined,
    };
  },

}
