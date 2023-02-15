import { AptosNetwork, AptosNetworkInput, AptosNetworkJSON } from '../../dataTypes';
import { AptosEstimateGasPriceResult, AptosEstimateGasPriceResultJSON } from '../types/AptosEstimateGasPriceResult';

// request parameters:
// - network ($ref: #/virtualParameter/network)

export interface EstimateGasPriceOperationRequest {
  /**
   * @description The network of query. Defaults to mainnet.
   */
  readonly network?: AptosNetworkInput | AptosNetwork;
}

export interface EstimateGasPriceOperationRequestJSON {
  readonly network?: AptosNetworkJSON;
}

export const EstimateGasPriceOperation = {
  operationId: "estimateGasPrice",
  groupName: "transactions",
  httpMethod: "get",
  routePattern: "/transactions/estimate_gas_price",
  parameterNames: ["network"],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: AptosEstimateGasPriceResultJSON): AptosEstimateGasPriceResult {
    return AptosEstimateGasPriceResult.fromJSON(json);
  },

  serializeRequest(request: EstimateGasPriceOperationRequest): EstimateGasPriceOperationRequestJSON {
    const network = request.network ? AptosNetwork.create(request.network) : undefined;
    return {
      network: network ? network.toJSON() : undefined,
    };
  },

}
