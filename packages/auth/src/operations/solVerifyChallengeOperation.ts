import { Camelize, Operation } from '@moralisweb3/common-core';
import { operations } from '../generated/types';

type OperationId = 'verifyChallengeSolana';

type BodyParams = operations[OperationId]['requestBody']['content']['application/json'];
type RequestParams = BodyParams;

type SuccessResponse = operations[OperationId]['responses']['201']['content']['application/json'];

// Exports

export interface SolVerifyChallengeRequest extends Camelize<RequestParams> {}

export type SolVerifyChallengeJSONRequest = ReturnType<typeof serializeRequest>;

export type SolVerifyChallengeJSONResponse = SuccessResponse;

export type SolVerifyChallengeResponse = ReturnType<typeof deserializeResponse>;

export const solVerifyChallengeOperation: Operation<
  SolVerifyChallengeRequest,
  SolVerifyChallengeJSONRequest,
  SolVerifyChallengeResponse,
  SolVerifyChallengeJSONResponse
  > = {
  method: 'POST',
  name: 'SolVerifyChallenge',
  id: 'SolVerifyChallenge',
  groupName: 'auth',
  urlPathPattern: '/challenge/request/sol',

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

function getRequestBody(request: SolVerifyChallengeRequest) {
  return {
    message: request.message,
    signature: request.signature,
  };
}

function deserializeResponse(jsonResponse: SolVerifyChallengeJSONResponse) {
  return jsonResponse;
}

function serializeRequest(request: SolVerifyChallengeRequest) {
  return {
    message: request.message,
    signature: request.signature,
  };
}

function deserializeRequest(jsonRequest: SolVerifyChallengeJSONRequest): SolVerifyChallengeRequest {
  return {
    message: jsonRequest.message,
    signature: jsonRequest.signature,
  };
}
