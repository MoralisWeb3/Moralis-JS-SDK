import { Camelize, maybe, Operation } from '@moralisweb3/common-core';
import { EvmAddress, EvmChain } from '@moralisweb3/common-evm-utils';
import { operations } from '../../generated/types';

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
  name: 'evmVerifyChallenge',
  id: 'verifyChallengeEvm',
  groupName: 'evm',
  urlPathPattern: '/challenge/verify/evm',
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

function getRequestBody(request: EvmVerifyChallengeRequest) {
  return {
    message: request.message,
    signature: request.signature,
  };
}

function deserializeResponse({ chainId, ...jsonResponse }: EvmVerifyChallengeJSONResponse) {
  return {
    ...jsonResponse,
    chain: EvmChain.create(chainId),
    address: EvmAddress.create(jsonResponse.address),
    expirationTime: maybe(jsonResponse.expirationTime, (value) => new Date(value)),
    notBefore: maybe(jsonResponse.notBefore, (value) => new Date(value)),
  };
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
