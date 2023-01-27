import { Camelize, Operation, ResponseAdapter } from '@moralisweb3/common-core';
import { operations } from '../openapi';

type OperationId = 'aptosStreamsUpdateStatus';

type PathParams = operations[OperationId]['parameters']['path'];
// TODO openapi spec has an impossible type for this operation (it should be UNION, not INTERSECTION)
// type BodyParams = operations[OperationId]['requestBody']['content']['application/json'];
type BodyParams = {
  status: 'active' | 'paused';
};
type RequestParams = PathParams & BodyParams;

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface UpdateStreamStatusAptosRequest extends Camelize<RequestParams> {}

export type UpdateStreamStatusAptosJSONRequest = ReturnType<typeof serializeRequest>;

export type UpdateStreamStatusAptosJSONResponse = SuccessResponse;

export type UpdateStreamStatusAptosResponse = ReturnType<typeof deserializeResponse>;

export interface UpdateStreamStatusAptosResponseAdapter
  extends ResponseAdapter<UpdateStreamStatusAptosResponse, UpdateStreamStatusAptosJSONResponse> {}

export const updateStreamStatusAptosOperation: Operation<
  UpdateStreamStatusAptosRequest,
  UpdateStreamStatusAptosJSONRequest,
  UpdateStreamStatusAptosResponse,
  UpdateStreamStatusAptosJSONResponse
> = {
  method: 'POST',
  name: 'updateStreamStatusAptos',
  id: 'aptosStreamsUpdateStatus',
  groupName: 'aptosStreams',
  urlPathParamNames: ['id'],
  urlPathPattern: '/streams/aptos/{id}/status',
  bodyParamNames: ['status'],
  bodyType: 'properties',

  getRequestUrlParams,
  getRequestBody,
  deserializeResponse,
  serializeRequest,
  deserializeRequest,
};

// Methods

function getRequestUrlParams(request: UpdateStreamStatusAptosRequest) {
  return {
    id: request.id,
  };
}

function getRequestBody(request: UpdateStreamStatusAptosRequest) {
  return {
    status: request.status,
  };
}

function deserializeResponse(jsonResponse: UpdateStreamStatusAptosJSONResponse) {
  return jsonResponse;
}

function serializeRequest(request: UpdateStreamStatusAptosRequest) {
  return {
    id: request.id,
    status: request.status,
  };
}

function deserializeRequest(jsonRequest: UpdateStreamStatusAptosJSONRequest): UpdateStreamStatusAptosRequest {
  return {
    id: jsonRequest.id,
    status: jsonRequest.status,
  };
}
