import { AptosNetwork, AptosNetworkInput, AptosNetworkJSON } from '../../dataTypes';
import { AptosSubmitBatchTransactionResult, AptosSubmitBatchTransactionResultJSON } from '../types/AptosSubmitBatchTransactionResult';
import { AptosSubmitTransactionRequest, AptosSubmitTransactionRequestInput, AptosSubmitTransactionRequestJSON } from '../types/AptosSubmitTransactionRequest';

// request parameters:
// - network ($ref: #/virtualParameter/network)

export interface SubmitBatchTransactionsOperationRequest {
  /**
   * @description The network of query. Defaults to mainnet.
   */
  readonly network?: AptosNetworkInput | AptosNetwork;
}

export interface SubmitBatchTransactionsOperationRequestJSON {
  readonly network?: AptosNetworkJSON;
}

export const SubmitBatchTransactionsOperation = {
  operationId: "submitBatchTransactions",
  groupName: "transactions",
  httpMethod: "post",
  routePattern: "/transactions/batch",
  parameterNames: ["network"],
  hasResponse: true,
  hasBody: true,

  parseResponse(json: AptosSubmitBatchTransactionResultJSON): AptosSubmitBatchTransactionResult {
    return AptosSubmitBatchTransactionResult.fromJSON(json);
  },

  serializeRequest(request: SubmitBatchTransactionsOperationRequest): SubmitBatchTransactionsOperationRequestJSON {
    const network = request.network ? AptosNetwork.create(request.network) : undefined;
    return {
      network: network ? network.toJSON() : undefined,
    };
  },

  serializeBody(body: AptosSubmitTransactionRequestInput[] | AptosSubmitTransactionRequest[]): AptosSubmitTransactionRequestJSON[] {
    const value = body.map((item) => AptosSubmitTransactionRequest.create(item));
    return value.map((item) => item.toJSON());
  },
}
