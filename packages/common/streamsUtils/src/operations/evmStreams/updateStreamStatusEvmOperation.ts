import { Camelize, Operation, ResponseAdapter } from '@moralisweb3/common-core';
import { operations } from '../openapi';

type OperationId = 'UpdateStreamStatus';

type PathParams = operations[OperationId]['parameters']['path'];
type BodyParams = operations[OperationId]['requestBody']['content']['application/json'];
type RequestParams = PathParams & BodyParams;

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface UpdateStreamStatusEvmRequest extends Camelize<RequestParams> {}

export type UpdateStreamStatusEvmJSONRequest = ReturnType<typeof serializeRequest>;

export type UpdateStreamStatusEvmJSONResponse = SuccessResponse;

export type UpdateStreamStatusEvmResponse = ReturnType<typeof deserializeResponse>;

export interface UpdateStreamStatusEvmResponseAdapter
  extends ResponseAdapter<UpdateStreamStatusEvmResponse, UpdateStreamStatusEvmJSONResponse> {}

export const updateStreamStatusEvmOperation: Operation<
  UpdateStreamStatusEvmRequest,
  UpdateStreamStatusEvmJSONRequest,
  UpdateStreamStatusEvmResponse,
  UpdateStreamStatusEvmJSONResponse
> = {
  method: 'POST',
  name: 'updateStreamStatusEvm',
  id: 'UpdateStreamStatus',
  groupName: 'evmStreams',
  urlPathParamNames: ['id'],
  urlPathPattern: '/streams/evm/{id}/status',
  bodyParamNames: ['status'],
  bodyType: 'properties',

  getRequestUrlParams,
  getRequestBody,
  deserializeResponse,
  serializeRequest,
  deserializeRequest,
};

// Methods

function getRequestUrlParams(request: UpdateStreamStatusEvmRequest) {
  return {
    id: request.id,
  };
}

function getRequestBody(request: UpdateStreamStatusEvmRequest) {
  return {
    status: request.status,
  };
}

function deserializeResponse(jsonResponse: UpdateStreamStatusEvmJSONResponse) {
  return jsonResponse;
}

function serializeRequest(request: UpdateStreamStatusEvmRequest) {
  return {
    id: request.id,
    status: request.status,
  };
}

function deserializeRequest(jsonRequest: UpdateStreamStatusEvmJSONRequest): UpdateStreamStatusEvmRequest {
  return {
    id: jsonRequest.id,
    status: jsonRequest.status,
  };
}
