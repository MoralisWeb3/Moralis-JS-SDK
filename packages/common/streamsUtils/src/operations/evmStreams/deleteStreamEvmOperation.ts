import { Camelize, Operation, ResponseAdapter } from '@moralisweb3/common-core';
import { operations } from '../openapi';

type OperationId = 'DeleteStream';
type PathParams = operations[OperationId]['parameters']['path'];
type RequestParams = PathParams;

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface DeleteStreamEvmRequest extends Camelize<RequestParams> {}

export type DeleteStreamEvmJSONRequest = ReturnType<typeof serializeRequest>;

export type DeleteStreamEvmJSONResponse = SuccessResponse;

export type DeleteStreamEvmResponse = ReturnType<typeof deserializeResponse>;

export interface DeleteStreamEvmResponseAdapter
  extends ResponseAdapter<DeleteStreamEvmResponse, DeleteStreamEvmJSONResponse> {}

export const deleteStreamEvmOperation: Operation<
  DeleteStreamEvmRequest,
  DeleteStreamEvmJSONRequest,
  DeleteStreamEvmResponse,
  DeleteStreamEvmJSONResponse
> = {
  method: 'DELETE',
  name: 'deleteStreamEvm',
  id: 'DeleteStream',
  groupName: 'evmStreams',
  urlPathParamNames: ['id'],
  urlPathPattern: `/streams/evm/{id}`,
  bodyParamNames: [],
  bodyType: 'properties',

  getRequestUrlParams,
  getRequestBody,
  deserializeResponse,
  serializeRequest,
  deserializeRequest,
};

// Methods

function getRequestUrlParams(request: DeleteStreamEvmRequest) {
  return {
    id: request.id,
  };
}

function getRequestBody() {
  return {};
}

function deserializeResponse(jsonResponse: DeleteStreamEvmJSONResponse) {
  return jsonResponse;
}

function serializeRequest(request: DeleteStreamEvmRequest) {
  return {
    id: request.id,
  };
}

function deserializeRequest(jsonRequest: DeleteStreamEvmJSONRequest): DeleteStreamEvmRequest {
  return {
    id: jsonRequest.id,
  };
}
