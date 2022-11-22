import { Camelize, maybe, Operation, ResponseAdapter } from '@moralisweb3/common-core';
import { SolAddress, SolNetwork } from '@moralisweb3/common-sol-utils';
import { operations } from '../../generated/types';

type OperationId = 'verifyChallengeSolana';

type BodyParams = operations[OperationId]['requestBody']['content']['application/json'];
type RequestParams = BodyParams;

type SuccessResponse = operations[OperationId]['responses']['201']['content']['application/json'];

// Exports

export interface VerifyChallengeSolanaRequest extends Camelize<RequestParams> {}

export type VerifyChallengeSolanaJSONRequest = ReturnType<typeof serializeRequest>;

export type VerifyChallengeSolanaJSONResponse = SuccessResponse;

export type VerifyChallengeSolanaResponse = ReturnType<typeof deserializeResponse>;

export interface VerifyChallengeSolanaResponseAdapter
  extends ResponseAdapter<VerifyChallengeSolanaResponse, VerifyChallengeSolanaJSONResponse> {}

export const verifyChallengeSolanaOperation: Operation<
  VerifyChallengeSolanaRequest,
  VerifyChallengeSolanaJSONRequest,
  VerifyChallengeSolanaResponse,
  VerifyChallengeSolanaJSONResponse
> = {
  method: 'POST',
  name: 'verifyChallengeSolana',
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

function getRequestBody(request: VerifyChallengeSolanaRequest) {
  return {
    message: request.message,
    signature: request.signature,
  };
}

function deserializeResponse({ network, ...jsonResponse }: VerifyChallengeSolanaJSONResponse) {
  return {
    ...jsonResponse,
    solNetwork: SolNetwork.create(network),
    address: SolAddress.create(jsonResponse.address),
    expirationTime: maybe(jsonResponse.expirationTime, (value) => new Date(value)),
    notBefore: maybe(jsonResponse.notBefore, (value) => new Date(value)),
  };
}

function serializeRequest(request: VerifyChallengeSolanaRequest) {
  return {
    message: request.message,
    signature: request.signature,
  };
}

function deserializeRequest(jsonRequest: VerifyChallengeSolanaJSONRequest): VerifyChallengeSolanaRequest {
  return {
    message: jsonRequest.message,
    signature: jsonRequest.signature,
  };
}
