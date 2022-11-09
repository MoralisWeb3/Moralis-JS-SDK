import { Camelize, Operation, DateInput } from '@moralisweb3/common-core';
import { SolAddress, SolAddressish, SolNetwork } from '@moralisweb3/common-sol-utils';
import { operations } from '../generated/types';

type OperationId = 'requestChallengeSolana';

type BodyParams = operations[OperationId]['requestBody']['content']['application/json'];
type RequestParams = BodyParams;

type SuccessResponse = operations[OperationId]['responses']['201']['content']['application/json'];

// Exports

export interface SolRequestChallengeRequest extends Camelize<Omit<RequestParams, 'address' | 'network' | 'expirationTime' | 'notBefore'>> {
  address: SolAddressish;
  network: SolNetwork;
  expirationTime?: DateInput;
  notBefore?: DateInput;
}

export type SolRequestChallengeJSONRequest = ReturnType<typeof serializeRequest>;

export type SolRequestChallengeJSONResponse = SuccessResponse;

export type SolRequestChallengeResponse = ReturnType<typeof deserializeResponse>;

export const solRequestChallengeOperation: Operation<
  SolRequestChallengeRequest,
  SolRequestChallengeJSONRequest,
  SolRequestChallengeResponse,
  SolRequestChallengeJSONResponse
  > = {
  method: 'POST',
  name: 'SolRequestChallenge',
  id: 'SolRequestChallenge',
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

function getRequestBody(request: SolRequestChallengeRequest) {
  return {
    domain: request.domain,
    network: SolNetwork.create(request.network).network,
    address: SolAddress.create(request.address).address,
    statement: request.statement,
    uri: request.uri,
    expirationTime: request.expirationTime,
    notBefore: request.notBefore,
    resources: request.resources,
    timeout: request.timeout,
  };
}

function deserializeResponse(jsonResponse: SolRequestChallengeJSONResponse) {
  return jsonResponse;
}

function serializeRequest(request: SolRequestChallengeRequest) {
  return {
    domain: request.domain,
    network: SolNetwork.create(request.network).network,
    address: SolAddress.create(request.address).address,
    statement: request.statement,
    uri: request.uri,
    expirationTime: request.expirationTime,
    notBefore: request.notBefore,
    resources: request.resources,
    timeout: request.timeout,
  };
}

function deserializeRequest(jsonRequest: SolRequestChallengeJSONRequest): SolRequestChallengeRequest {
  return {
    domain: jsonRequest.domain,
    network: SolNetwork.create(jsonRequest.network),
    address: SolAddress.create(jsonRequest.address),
    statement: jsonRequest.statement,
    uri: jsonRequest.uri,
    expirationTime: jsonRequest.expirationTime,
    notBefore: jsonRequest.notBefore,
    resources: jsonRequest.resources,
    timeout: jsonRequest.timeout,
  };
}
