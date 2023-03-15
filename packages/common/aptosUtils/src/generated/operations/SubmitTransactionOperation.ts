import { AptosNetwork, AptosNetworkInput, AptosNetworkJSON } from '../../dataTypes';
import { AptosPendingTransaction, AptosPendingTransactionJSON } from '../types/AptosPendingTransaction';
import { AptosSubmitTransactionRequest, AptosSubmitTransactionRequestInput, AptosSubmitTransactionRequestJSON } from '../types/AptosSubmitTransactionRequest';

// request parameters:
// - network ($ref: #/virtualParameter/network)

export interface SubmitTransactionOperationRequest {
  /**
   * @description The network of query. Defaults to mainnet.
   */
  readonly network?: AptosNetworkInput | AptosNetwork;
}

export interface SubmitTransactionOperationRequestJSON {
  readonly network?: AptosNetworkJSON;
}

export const SubmitTransactionOperation = {
  operationId: "submitTransaction",
  groupName: "transactions",
  httpMethod: "post",
  routePattern: "/transactions",
  parameterNames: ["network"],
  hasResponse: true,
  hasBody: true,

  parseResponse(json: AptosPendingTransactionJSON): AptosPendingTransaction {
    return AptosPendingTransaction.fromJSON(json);
  },

  serializeRequest(request: SubmitTransactionOperationRequest): SubmitTransactionOperationRequestJSON {
    const network = request.network ? AptosNetwork.create(request.network) : undefined;
    return {
      network: network ? network.toJSON() : undefined,
    };
  },

  serializeBody(body: AptosSubmitTransactionRequestInput | AptosSubmitTransactionRequest): AptosSubmitTransactionRequestJSON {
    const value = AptosSubmitTransactionRequest.create(body);
    return value.toJSON();
  },
}
