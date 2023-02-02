import { Camelize, Operation, ResponseAdapter } from '@moralisweb3/common-core';
import { operations } from '../openapi';

type OperationId = 'aptosStreamsDelete';
type PathParams = operations[OperationId]['parameters']['path'];
type RequestParams = PathParams;

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface DeleteStreamAptosRequest extends Camelize<RequestParams> {}

export type DeleteStreamAptosJSONRequest = ReturnType<typeof serializeRequest>;

export type DeleteStreamAptosJSONResponse = SuccessResponse;

export type DeleteStreamAptosResponse = ReturnType<typeof deserializeResponse>;

export interface DeleteStreamAptosResponseAdapter
  extends ResponseAdapter<DeleteStreamAptosResponse, DeleteStreamAptosJSONResponse> {}

export const deleteStreamAptosOperation: Operation<
  DeleteStreamAptosRequest,
  DeleteStreamAptosJSONRequest,
  DeleteStreamAptosResponse,
  DeleteStreamAptosJSONResponse
> = {
  method: 'DELETE',
  name: 'deleteStreamAptos',
  id: 'aptosStreamsDelete',
  groupName: 'aptosStreams',
  urlPathParamNames: ['id'],
  urlPathPattern: `/streams/aptos/{id}`,
  bodyParamNames: [],
  bodyType: 'properties',

  getRequestUrlParams,
  getRequestBody,
  deserializeResponse,
  serializeRequest,
  deserializeRequest,
};

// Methods

function getRequestUrlParams(request: DeleteStreamAptosRequest) {
  return {
    id: request.id,
  };
}

function getRequestBody() {
  return {};
}

function deserializeResponse(jsonResponse: DeleteStreamAptosJSONResponse) {
  return jsonResponse;
}

function serializeRequest(request: DeleteStreamAptosRequest) {
  return {
    id: request.id,
  };
}

function deserializeRequest(jsonRequest: DeleteStreamAptosJSONRequest): DeleteStreamAptosRequest {
  return {
    id: jsonRequest.id,
  };
}
