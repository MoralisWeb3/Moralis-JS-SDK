import { AptosEstimateGasPriceResult, AptosEstimateGasPriceResultJSON } from '../types/AptosEstimateGasPriceResult';

// request parameters:

export interface EstimateGasPriceOperationRequest {
}

export interface EstimateGasPriceOperationRequestJSON {
}

export const EstimateGasPriceOperation = {
  operationId: "estimateGasPrice",
  groupName: "transactions",
  httpMethod: "get",
  routePattern: "/transactions/estimate_gas_price",
  parameterNames: [],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: AptosEstimateGasPriceResultJSON): AptosEstimateGasPriceResult {
    return AptosEstimateGasPriceResult.fromJSON(json);
  },

  serializeRequest(request: EstimateGasPriceOperationRequest): EstimateGasPriceOperationRequestJSON {
    return {
    };
  },

}
