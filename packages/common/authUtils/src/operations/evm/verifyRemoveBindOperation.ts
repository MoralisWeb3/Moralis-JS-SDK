import { Camelize, Operation, ResponseAdapter } from '@moralisweb3/common-core';
import { operations } from '../openapi';

type OperationId = 'verifyRemoveBind';

type BodyParams = operations[OperationId]['requestBody']['content']['application/json'];
type RequestParams = BodyParams;

type SuccessResponse = operations[OperationId]['responses']['201']['content']['application/json'];

// Exports

export interface VerifyRemoveBindRequest extends Camelize<RequestParams> {}

export type VerifyRemoveBindJSONRequest = ReturnType<typeof serializeRequest>;

export type VerifyRemoveBindJSONResponse = SuccessResponse;

export type VerifyRemoveBindResponse = ReturnType<typeof deserializeResponse>;

export interface VerifyRemoveBindResponseAdapter
  extends ResponseAdapter<VerifyRemoveBindResponse, VerifyRemoveBindJSONResponse> {}

export const verifyRemoveBindOperation: Operation<
  VerifyRemoveBindRequest,
  VerifyRemoveBindJSONRequest,
  VerifyRemoveBindResponse,
  VerifyRemoveBindJSONResponse
> = {
  method: 'POST',
  name: 'verifyRemoveBind',
  id: 'verifyRemoveBind',
  groupName: 'evm',
  urlPathPattern: '/bind/remove/verify',
  bodyParamNames: ['message', 'signature'],
  bodyType: 'properties',

  getRequestUrlParams,
  getRequestBody,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

// Methods

function getRequestUrlParams() {
  return {};
}

function getRequestBody(request: VerifyRemoveBindRequest) {
  return {
    message: request.message,
    signature: request.signature,
  };
}

function deserializeResponse(jsonResponse: VerifyRemoveBindJSONResponse) {
  return jsonResponse;
}

function serializeRequest(request: VerifyRemoveBindRequest) {
  return {
    message: request.message,
    signature: request.signature,
  };
}

function deserializeRequest(jsonRequest: VerifyRemoveBindJSONRequest): VerifyRemoveBindRequest {
  return {
    message: jsonRequest.message,
    signature: jsonRequest.signature,
  };
}
