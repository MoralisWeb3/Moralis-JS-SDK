import { AptosNetwork, AptosNetworkInput, AptosNetworkResolver } from '@moralisweb3/common-aptos-utils';
import { Core, Camelize, Operation, DateInput, ResponseAdapter } from '@moralisweb3/common-core';
import { AptosAddress, AptosAddressInput } from '@moralisweb3/common-aptos-utils';
import { operations } from '../openapi';

type OperationId = 'requestChallengeAptos';

type BodyParams = operations[OperationId]['requestBody']['content']['application/json'];
type RequestParams = BodyParams;

type SuccessResponse = operations[OperationId]['responses']['201']['content']['application/json'];

// Exports

export interface RequestChallengeAptosRequest
  extends Camelize<Omit<RequestParams, 'address' | 'network' | 'expirationTime' | 'notBefore'>> {
  address: AptosAddressInput;
  network: AptosNetworkInput;
  expirationTime?: DateInput;
  notBefore?: DateInput;
}

export type RequestChallengeAptosJSONRequest = ReturnType<typeof serializeRequest>;

export type RequestChallengeAptosJSONResponse = SuccessResponse;

export type RequestChallengeAptosResponse = ReturnType<typeof deserializeResponse>;

export interface RequestChallengeAptosResponseAdapter
  extends ResponseAdapter<RequestChallengeAptosResponse, RequestChallengeAptosJSONResponse> {}

/** The back channel challenge containing the id to store on the api and the message to be signed by the user */
export const requestChallengeAptosOperation: Operation<
  RequestChallengeAptosRequest,
  RequestChallengeAptosJSONRequest,
  RequestChallengeAptosResponse,
  RequestChallengeAptosJSONResponse
> = {
  method: 'POST',
  name: 'requestChallengeAptos',
  id: 'requestChallengeAptos',
  groupName: 'aptos',
  urlPathPattern: '/challenge/request/aptos',
  bodyParamNames: [
    'domain',
    'network',
    'address',
    'statement',
    'uri',
    'expirationTime',
    'notBefore',
    'resources',
    'timeout',
    'publicKey',
  ],
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

function getRequestBody(request: RequestChallengeAptosRequest) {
  return {
    domain: request.domain,
    network: AptosNetwork.create(request.network).toString(),
    address: AptosAddress.create(request.address).toString(),
    publicKey: request.publicKey,
    statement: request.statement,
    uri: request.uri,
    expirationTime: request.expirationTime,
    notBefore: request.notBefore,
    resources: request.resources,
    timeout: request.timeout,
  };
}

function deserializeResponse(jsonResponse: RequestChallengeAptosJSONResponse) {
  return jsonResponse;
}

function serializeRequest(request: RequestChallengeAptosRequest, core: Core) {
  return {
    domain: request.domain,
    network: AptosNetworkResolver.resolve(request.network, core),
    address: AptosAddress.create(request.address).toString(),
    publicKey: request.publicKey,
    statement: request.statement,
    uri: request.uri,
    expirationTime: request.expirationTime,
    notBefore: request.notBefore,
    resources: request.resources,
    timeout: request.timeout,
  };
}

function deserializeRequest(jsonRequest: RequestChallengeAptosJSONRequest): RequestChallengeAptosRequest {
  return {
    domain: jsonRequest.domain,
    network: AptosNetwork.create(jsonRequest.network),
    address: AptosAddress.create(jsonRequest.address),
    publicKey: jsonRequest.publicKey,
    statement: jsonRequest.statement,
    uri: jsonRequest.uri,
    expirationTime: jsonRequest.expirationTime,
    notBefore: jsonRequest.notBefore,
    resources: jsonRequest.resources,
    timeout: jsonRequest.timeout,
  };
}
