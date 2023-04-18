import { EvmEndpointWeights, EvmEndpointWeightsJSON } from '../types/EvmEndpointWeights';

// request parameters:

export interface EndpointWeightsOperationRequest {
}

export interface EndpointWeightsOperationRequestJSON {
}

export type EndpointWeightsOperationResponse = EvmEndpointWeights[];
export type EndpointWeightsOperationResponseJSON = EvmEndpointWeightsJSON[];

export const EndpointWeightsOperation = {
  operationId: "endpointWeights",
  groupName: "utils",
  httpMethod: "get",
  routePattern: "/info/endpointWeights",
  parameterNames: [],
  hasResponse: true,
  hasBody: false,

  parseResponse(json: EvmEndpointWeightsJSON[]): EvmEndpointWeights[] {
    return json.map((item) => EvmEndpointWeights.fromJSON(item));
  },

  serializeRequest(request: EndpointWeightsOperationRequest): EndpointWeightsOperationRequestJSON {
    return {
    };
  },

}
