import { AptosNetwork, AptosNetworkInput, AptosNetworkJSON } from '../../dataTypes';
import { AptosSimulateTransaction, AptosSimulateTransactionJSON } from '../types/AptosSimulateTransaction';
import { AptosSubmitTransactionRequest, AptosSubmitTransactionRequestInput, AptosSubmitTransactionRequestJSON } from '../types/AptosSubmitTransactionRequest';

// request parameters:
// - network ($ref: #/virtualParameter/network)

export interface SimulateTransactionOperationRequest {
  /**
   * @description The network of query. Defaults to mainnet.
   */
  readonly network?: AptosNetworkInput | AptosNetwork;
}

export interface SimulateTransactionOperationRequestJSON {
  readonly network?: AptosNetworkJSON;
}

export const SimulateTransactionOperation = {
  operationId: "simulateTransaction",
  groupName: "transactions",
  httpMethod: "post",
  routePattern: "/transactions/simulate",
  parameterNames: ["network"],
  hasResponse: true,
  hasBody: true,

  parseResponse(json: AptosSimulateTransactionJSON): AptosSimulateTransaction {
    return AptosSimulateTransaction.fromJSON(json);
  },

  serializeRequest(request: SimulateTransactionOperationRequest): SimulateTransactionOperationRequestJSON {
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
