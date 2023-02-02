import { Camelize, Operation, ResponseAdapter } from '@moralisweb3/common-core';
import { AptosNetwork, AptosNetworkish } from '@moralisweb3/common-aptos-utils';
import { AptosStream } from '../../dataTypes';
import { operations } from '../openapi';

type OperationId = 'aptosStreamsUpdate';

type PathParams = operations[OperationId]['parameters']['path'];
type BodyParams = operations[OperationId]['requestBody']['content']['application/json'];
type RequestParams = PathParams & BodyParams;

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface UpdateStreamAptosRequest extends Camelize<Omit<RequestParams, 'network'>> {
  network: AptosNetworkish[];
}

export type UpdateStreamAptosJSONRequest = ReturnType<typeof serializeRequest>;

export type UpdateStreamAptosJSONResponse = SuccessResponse;

export type UpdateStreamAptosResponse = ReturnType<typeof deserializeResponse>;

export interface UpdateStreamAptosResponseAdapter
  extends ResponseAdapter<UpdateStreamAptosResponse, UpdateStreamAptosJSONResponse> {}

export const updateStreamAptosOperation: Operation<
  UpdateStreamAptosRequest,
  UpdateStreamAptosJSONRequest,
  UpdateStreamAptosResponse,
  UpdateStreamAptosJSONResponse
> = {
  method: 'POST',
  name: 'updateStreamAptos',
  id: 'aptosStreamsUpdate',
  groupName: 'aptosStreams',
  urlPathParamNames: ['id'],
  urlPathPattern: '/streams/aptos/{id}',
  bodyParamNames: [
    'allAddresses',
    'demo',
    'description',
    'includeChanges',
    'includeEvents',
    'includePayload',
    'network',
    'events',
    'functions',
    'tag',
    'webhookUrl',
  ],
  bodyType: 'properties',

  getRequestUrlParams,
  getRequestBody,
  deserializeResponse,
  serializeRequest,
  deserializeRequest,
};

// Methods

function getRequestUrlParams(request: UpdateStreamAptosRequest) {
  return {
    id: request.id,
  };
}

function getRequestBody(request: UpdateStreamAptosRequest) {
  return {
    allAddresses: request.allAddresses,
    demo: request.demo,
    description: request.description,
    includeChanges: request.includeChanges,
    includeEvents: request.includeEvents,
    includePayload: request.includePayload,
    network: request.network.map((network) => AptosNetwork.create(network)),
    events: request.events,
    functions: request.functions,
    tag: request.tag,
    webhookUrl: request.webhookUrl,
  };
}

function deserializeResponse(jsonResponse: UpdateStreamAptosJSONResponse) {
  return AptosStream.create(jsonResponse);
}

function serializeRequest(request: UpdateStreamAptosRequest) {
  return {
    id: request.id,
    allAddresses: request.allAddresses,
    demo: request.demo,
    description: request.description,
    includeChanges: request.includeChanges,
    includeEvents: request.includeEvents,
    includePayload: request.includePayload,
    network: request.network.map((network) => AptosNetwork.create(network).network),
    events: request.events,
    functions: request.functions,
    tag: request.tag,
    webhookUrl: request.webhookUrl,
  };
}

function deserializeRequest(jsonRequest: UpdateStreamAptosJSONRequest): UpdateStreamAptosRequest {
  return {
    id: jsonRequest.id,
    allAddresses: jsonRequest.allAddresses,
    demo: jsonRequest.demo,
    description: jsonRequest.description,
    includeChanges: jsonRequest.includeChanges,
    includeEvents: jsonRequest.includeEvents,
    includePayload: jsonRequest.includePayload,
    network: jsonRequest.network.map((network) => AptosNetwork.create(network)),
    events: jsonRequest.events,
    functions: jsonRequest.functions,
    tag: jsonRequest.tag,
    webhookUrl: jsonRequest.webhookUrl,
  };
}
