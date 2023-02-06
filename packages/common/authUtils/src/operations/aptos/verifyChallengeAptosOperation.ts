import { AptosNetwork } from '@moralisweb3/common-aptos-utils';
import { Camelize, maybe, Operation, ResponseAdapter } from '@moralisweb3/common-core';
import { AptosAddress } from '@moralisweb3/common-aptos-utils';
import { operations } from '../openapi';

type OperationId = 'verifyChallengeAptos';

type BodyParams = operations[OperationId]['requestBody']['content']['application/json'];
type RequestParams = BodyParams;

type SuccessResponse = operations[OperationId]['responses']['201']['content']['application/json'];

// Exports

export interface VerifyChallengeAptosRequest extends Camelize<RequestParams> {}

export type VerifyChallengeAptosJSONRequest = ReturnType<typeof serializeRequest>;

export type VerifyChallengeAptosJSONResponse = SuccessResponse;

export type VerifyChallengeAptosResponse = ReturnType<typeof deserializeResponse>;

export interface VerifyChallengeAptosResponseAdapter
  extends ResponseAdapter<VerifyChallengeAptosResponse, VerifyChallengeAptosJSONResponse> {}

export const verifyChallengeAptosOperation: Operation<
  VerifyChallengeAptosRequest,
  VerifyChallengeAptosJSONRequest,
  VerifyChallengeAptosResponse,
  VerifyChallengeAptosJSONResponse
> = {
  method: 'POST',
  name: 'verifyChallengeAptos',
  id: 'verifyChallengeAptos',
  groupName: 'aptos',
  urlPathPattern: '/challenge/verify/aptos',
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

function getRequestBody(request: VerifyChallengeAptosRequest) {
  return {
    message: request.message,
    signature: request.signature,
  };
}

function deserializeResponse({ chainId, ...jsonResponse }: VerifyChallengeAptosJSONResponse) {
  return {
    ...jsonResponse,
    chain: AptosNetwork.create(chainId),
    address: AptosAddress.create(jsonResponse.address),
    expirationTime: maybe(jsonResponse.expirationTime, (value) => new Date(value)),
    notBefore: maybe(jsonResponse.notBefore, (value) => new Date(value)),
  };
}

function serializeRequest(request: VerifyChallengeAptosRequest) {
  return {
    message: request.message,
    signature: request.signature,
  };
}

function deserializeRequest(jsonRequest: VerifyChallengeAptosJSONRequest): VerifyChallengeAptosRequest {
  return {
    message: jsonRequest.message,
    signature: jsonRequest.signature,
  };
}
