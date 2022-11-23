import { Camelize, Operation, DateInput, ResponseAdapter } from '@moralisweb3/common-core';
import { SolAddress, SolAddressish, SolNetwork, SolNetworkish } from '@moralisweb3/common-sol-utils';
import { operations } from '../../generated/types';

type OperationId = 'requestChallengeSolana';

type BodyParams = operations[OperationId]['requestBody']['content']['application/json'];
type RequestParams = BodyParams;

type SuccessResponse = operations[OperationId]['responses']['201']['content']['application/json'];

// Exports

export interface RequestChallengeSolanaRequest
  extends Camelize<Omit<RequestParams, 'address' | 'network' | 'expirationTime' | 'notBefore'>> {
  address: SolAddressish;
  network: SolNetworkish;
  expirationTime?: DateInput;
  notBefore?: DateInput;
}

export type RequestChallengeSolanaJSONRequest = ReturnType<typeof serializeRequest>;

export type RequestChallengeSolanaJSONResponse = SuccessResponse;

export type RequestChallengeSolanaResponse = ReturnType<typeof deserializeResponse>;

<<<<<<< HEAD
/** The back channel challenge containing the id to store on the api and the message to be signed by the user */
=======
export interface RequestChallengeSolanaResponseAdapter
  extends ResponseAdapter<RequestChallengeSolanaResponse, RequestChallengeSolanaJSONResponse> {}

>>>>>>> 1201d180ea476c6b85fb8335f8417667fe62d28e
export const requestChallengeSolanaOperation: Operation<
  RequestChallengeSolanaRequest,
  RequestChallengeSolanaJSONRequest,
  RequestChallengeSolanaResponse,
  RequestChallengeSolanaJSONResponse
> = {
  method: 'POST',
  name: 'requestChallengeSolana',
  id: 'requestChallengeSolana',
  groupName: 'solana',
  urlPathPattern: '/challenge/request/solana',
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

function getRequestBody(request: RequestChallengeSolanaRequest) {
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

function deserializeResponse(jsonResponse: RequestChallengeSolanaJSONResponse) {
  return jsonResponse;
}

function serializeRequest(request: RequestChallengeSolanaRequest) {
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

function deserializeRequest(jsonRequest: RequestChallengeSolanaJSONRequest): RequestChallengeSolanaRequest {
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
