import { Camelize, Operation } from '@moralisweb3/common-core';
import { operations } from '../generated/types';

type OperationId = 'verifyChallengeEvm';

type BodyParams = operations[OperationId]['requestBody']['content']['application/json'];
type RequestParams = BodyParams;

type SuccessResponse = operations[OperationId]['responses']['201']['content']['application/json'];

// Exports

export interface EvmVerifyChallengeRequest extends Camelize<RequestParams> {}

export type EvmVerifyChallengeJSONRequest = ReturnType<typeof serializeRequest>;

export type EvmVerifyChallengeJSONResponse = SuccessResponse;

export type EvmVerifyChallengeResponse = ReturnType<typeof deserializeResponse>;

export const evmVerifyChallengeOperation: Operation<
  EvmVerifyChallengeRequest,
  EvmVerifyChallengeJSONRequest,
  EvmVerifyChallengeResponse,
  EvmVerifyChallengeJSONResponse
  > = {
  method: 'POST',
  name: 'EvmVerifyChallenge',
  id: 'EvmVerifyChallenge',
  groupName: 'auth',
  urlPathPattern: '/challenge/request/evm',

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

function getRequestBody(request: EvmVerifyChallengeRequest) {
  return {
    message: request.message,
    signature: request.signature,
  };
}

function deserializeResponse(jsonResponse: EvmVerifyChallengeJSONResponse) {
  return jsonResponse;
}

function serializeRequest(request: EvmVerifyChallengeRequest) {
  return {
    message: request.message,
    signature: request.signature,
  };
}

function deserializeRequest(jsonRequest: EvmVerifyChallengeJSONRequest): EvmVerifyChallengeRequest {
  return {
    message: jsonRequest.message,
    signature: jsonRequest.signature,
  };
}
