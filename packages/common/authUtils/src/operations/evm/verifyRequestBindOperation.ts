import { Camelize, Operation, ResponseAdapter } from '@moralisweb3/common-core';
import { operations } from 'packages/common/authUtils/src/operations/openapi';

type OperationId = 'verifyRequestBind';

type BodyParams = operations[OperationId]['requestBody']['content']['application/json'];
type RequestParams = BodyParams;

type SuccessResponse = operations[OperationId]['responses']['201']['content']['application/json'];

// Exports

export interface VerifyRequestBindRequest extends Camelize<RequestParams> {}

export type VerifyRequestBindJSONRequest = ReturnType<typeof serializeRequest>;

export type VerifyRequestBindJSONResponse = SuccessResponse;

export type VerifyRequestBindResponse = ReturnType<typeof deserializeResponse>;

export interface VerifyRequestBindResponseAdapter
  extends ResponseAdapter<VerifyRequestBindResponse, VerifyRequestBindJSONResponse> {}

export const verifyRequestBindOperation: Operation<
  VerifyRequestBindRequest,
  VerifyRequestBindJSONRequest,
  VerifyRequestBindResponse,
  VerifyRequestBindJSONResponse
> = {
  method: 'POST',
  name: 'verifyRequestBind',
  id: 'verifyRequestBind',
  groupName: 'evm',
  urlPathPattern: '/bind/request/verify',
  bodyParamNames: ['verifications'],
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

function getRequestBody(request: VerifyRequestBindRequest) {
  return {
    verifications: request.verifications,
  };
}

function deserializeResponse(jsonResponse: VerifyRequestBindJSONResponse) {
  return jsonResponse;
}

function serializeRequest(request: VerifyRequestBindRequest) {
  return {
    verifications: request.verifications,
  };
}

function deserializeRequest(jsonRequest: VerifyRequestBindJSONRequest): VerifyRequestBindRequest {
  return {
    verifications: jsonRequest.verifications,
  };
}
