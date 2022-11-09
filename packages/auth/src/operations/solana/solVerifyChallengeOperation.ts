import { Camelize, maybe, Operation } from '@moralisweb3/common-core';
import { SolAddress, SolNetwork } from '@moralisweb3/common-sol-utils';
import { operations } from '../../generated/types';

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
  name: 'solVerifyChallenge',
  id: 'verifyChallengeSolana',
  groupName: 'solana',
  urlPathPattern: '/challenge/verify/solana',
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

function getRequestBody(request: SolVerifyChallengeRequest) {
  return {
    message: request.message,
    signature: request.signature,
  };
}

function deserializeResponse({ network, ...jsonResponse }: SolVerifyChallengeJSONResponse) {
  return {
    ...jsonResponse,
    solNetwork: SolNetwork.create(network),
    address: SolAddress.create(jsonResponse.address),
    expirationTime: maybe(jsonResponse.expirationTime, (value) => new Date(value)),
  };
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
