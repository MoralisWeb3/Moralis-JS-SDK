import { Camelize, maybe, Operation, ResponseAdapter } from '@moralisweb3/common-core';
import { EvmAddress, EvmChain } from '@moralisweb3/common-evm-utils';
import { operations } from '../../generated/types';

type OperationId = 'verifyChallengeEvm';

type BodyParams = operations[OperationId]['requestBody']['content']['application/json'];
type RequestParams = BodyParams;

type SuccessResponse = operations[OperationId]['responses']['201']['content']['application/json'];

// Exports

export interface VerifyChallengeEvmRequest extends Camelize<RequestParams> {}

export type VerifyChallengeEvmJSONRequest = ReturnType<typeof serializeRequest>;

export type VerifyChallengeEvmJSONResponse = SuccessResponse;

export type VerifyChallengeEvmResponse = ReturnType<typeof deserializeResponse>;

export interface VerifyChallengeEvmResponseAdapter
  extends ResponseAdapter<VerifyChallengeEvmResponse, VerifyChallengeEvmJSONResponse> {}

export const verifyChallengeEvmOperation: Operation<
  VerifyChallengeEvmRequest,
  VerifyChallengeEvmJSONRequest,
  VerifyChallengeEvmResponse,
  VerifyChallengeEvmJSONResponse
> = {
  method: 'POST',
  name: 'verifyChallengeEvm',
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

function getRequestBody(request: VerifyChallengeEvmRequest) {
  return {
    message: request.message,
    signature: request.signature,
  };
}

function deserializeResponse({ chainId, ...jsonResponse }: VerifyChallengeEvmJSONResponse) {
  return {
    ...jsonResponse,
    chain: EvmChain.create(chainId),
    address: EvmAddress.create(jsonResponse.address),
    expirationTime: maybe(jsonResponse.expirationTime, (value) => new Date(value)),
    notBefore: maybe(jsonResponse.notBefore, (value) => new Date(value)),
  };
}

function serializeRequest(request: VerifyChallengeEvmRequest) {
  return {
    message: request.message,
    signature: request.signature,
  };
}

function deserializeRequest(jsonRequest: VerifyChallengeEvmJSONRequest): VerifyChallengeEvmRequest {
  return {
    message: jsonRequest.message,
    signature: jsonRequest.signature,
  };
}
