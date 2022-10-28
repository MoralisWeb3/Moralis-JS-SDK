import { Operation } from '@moralisweb3/common-core';

import { operations } from '../openapi';

type OperationId = 'endpointWeights';

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface EndpointWeightsRequest {}

export type EndpointWeightsJSONRequest = undefined;

export type EndpointWeightsJSONResponse = SuccessResponse;

export type EndpointWeightsResponse = ReturnType<typeof deserializeResponse>;

export const EndpointWeightsOperation: Operation<
  EndpointWeightsRequest,
  EndpointWeightsJSONRequest,
  EndpointWeightsResponse,
  EndpointWeightsJSONResponse
> = {
  method: 'GET',
  name: 'endpointWeights',
  id: 'endpointWeights',
  groupName: 'token',
  urlPathPattern: '/info/endpointWeights',

  deserializeResponse,
};

// Methods

function deserializeResponse(jsonResponse: EndpointWeightsJSONResponse) {
  return jsonResponse;
}
