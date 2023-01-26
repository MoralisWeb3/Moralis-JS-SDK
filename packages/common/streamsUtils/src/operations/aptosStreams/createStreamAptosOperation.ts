import { Camelize, Operation, ResponseAdapter } from '@moralisweb3/common-core';
import { AptosNetwork, AptosNetworkish } from '@moralisweb3/common-aptos-utils';
import { AptosStream } from '../../dataTypes';
import { operations } from '../openapi';

type OperationId = 'aptosStreamsCreate';

type BodyParams = operations[OperationId]['requestBody']['content']['application/json'];
type RequestParams = BodyParams;

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface CreateStreamAptosRequest extends Camelize<Omit<RequestParams, 'network'>> {
  network: AptosNetworkish[];
}

export type CreateStreamAptosJSONRequest = ReturnType<typeof serializeRequest>;

export type CreateStreamAptosJSONResponse = SuccessResponse;

export type CreateStreamAptosResponse = ReturnType<typeof deserializeResponse>;

export interface CreateStreamAptosResponseAdapter
  extends ResponseAdapter<CreateStreamAptosResponse, CreateStreamAptosJSONResponse> {}

export const createStreamAptosOperation: Operation<
  CreateStreamAptosRequest,
  CreateStreamAptosJSONRequest,
  CreateStreamAptosResponse,
  CreateStreamAptosJSONResponse
> = {
  method: 'PUT',
  name: 'createStreamAptos',
  id: 'aptosStreamsCreate',
  groupName: 'aptosStreams',
  urlPathPattern: '/streams/aptos',
  bodyParamNames: [
    'webhookUrl',
    'tag',
    'functions',
    'events',
    'network',
    'includePayload',
    'includeEvents',
    'includeChanges',
    'description',
    'demo',
    'allAddresses',
  ],
  bodyType: 'properties',

  getRequestUrlParams,
  getRequestBody,
  deserializeResponse,
  serializeRequest,
  deserializeRequest,
};

// Methods

function getRequestUrlParams() {
  return {};
}

function getRequestBody(request: CreateStreamAptosRequest) {
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

function deserializeResponse(jsonResponse: CreateStreamAptosJSONResponse) {
  return AptosStream.create(jsonResponse);
}

function serializeRequest(request: CreateStreamAptosRequest) {
  return {
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

function deserializeRequest(jsonRequest: CreateStreamAptosJSONRequest): CreateStreamAptosRequest {
  return {
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
