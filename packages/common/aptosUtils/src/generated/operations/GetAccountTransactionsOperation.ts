import { AptosNetwork, AptosNetworkInput, AptosNetworkJSON } from '../../dataTypes';
import { AptosGetAccountTransactionsItem, AptosGetAccountTransactionsItemValue, AptosGetAccountTransactionsItemJSON } from '../types/AptosGetAccountTransactionsItem';

// request parameters:
// - address ($ref: #/paths/~1accounts~1{address}~1transactions/get/parameters/0/schema)
// - limit ($ref: #/paths/~1accounts~1{address}~1transactions/get/parameters/1/schema)
// - start ($ref: #/paths/~1accounts~1{address}~1transactions/get/parameters/2/schema)
// - network ($ref: #/virtualParameter/network)

export interface GetAccountTransactionsOperationRequest {
  /**
   * @description Address of account with or without a 0x prefix
   */
  readonly address: string;
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

export interface GetAccountTransactionsOperationRequestJSON {
  readonly address: string;
  readonly limit?: number;
  readonly start?: string;
  readonly network?: AptosNetworkJSON;
}

export const GetAccountTransactionsOperation = {
  operationId: "getAccountTransactions",
  groupName: "transactions",
  httpMethod: "get",
  routePattern: "/accounts/{address}/transactions",
  parameterNames: ["address","limit","start","network"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: AptosGetAccountTransactionsItemJSON[]): AptosGetAccountTransactionsItemValue[] {
    return json.map((item) => AptosGetAccountTransactionsItem.fromJSON(item));
  },

  serializeRequest(request: GetAccountTransactionsOperationRequest): GetAccountTransactionsOperationRequestJSON {
    const address = request.address;
    const limit = request.limit;
    const start = request.start;
    const network = request.network ? AptosNetwork.create(request.network) : undefined;
    return {
      address: address,
      limit: limit,
      start: start,
      network: network ? network.toJSON() : undefined,
    };
  },

}
