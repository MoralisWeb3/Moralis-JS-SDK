import { AptEndpointWeights, AptEndpointWeightsJSON, AptEndpointWeightsInput } from '../types/AptEndpointWeights';

export interface AptEndpointWeightsOperationRequestJSON {}

export interface AptEndpointWeightsOperationRequest {}

/**
 * @description Get the cost and rate limit for each API endpoint.
 */
export const AptEndpointWeightsOperation = {
  operationId: 'endpointWeights',
  httpMethod: 'get',
  routePattern: '/info/endpointWeights',
  parameterNames: [],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: AptEndpointWeightsJSON[]): AptEndpointWeights[] {
    return json.map((item) => AptEndpointWeights.fromJSON(item));
  },

  serializeRequest(request: AptEndpointWeightsOperationRequest): AptEndpointWeightsOperationRequestJSON {
    return {};
  },
};
