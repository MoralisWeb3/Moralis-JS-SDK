import { Operation } from '@moralisweb3/common-core';

import { operations } from '../openapi';

type OperationId = 'endpointWeights';

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface EndpointWeightsRequest {}

export type EndpointWeightsJSONRequest = undefined;

export type EndpointWeightsJSONResponse = SuccessResponse;

export type EndpointWeightsResponse = ReturnType<typeof deserializeResponse>;

export const endpointWeightsOperation: Operation<
  EndpointWeightsRequest,
  EndpointWeightsJSONRequest,
  EndpointWeightsResponse,
  EndpointWeightsJSONResponse
> = {
  method: 'GET',
  name: 'endpointWeights',
  id: 'endpointWeights',
  groupName: 'utils',
  urlPathPattern: '/info/endpointWeights',
  urlPathParamNames: [],

  getRequestUrlParams,
  deserializeRequest,
  serializeRequest,
  deserializeResponse,
};

// Methods

function getRequestUrlParams() {
  return {};
}

function serializeRequest() {
  return undefined;
}

function deserializeRequest() {
  return {};
}

function deserializeResponse(jsonResponse: EndpointWeightsJSONResponse) {
  return jsonResponse;
}
