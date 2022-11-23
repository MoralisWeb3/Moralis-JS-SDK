import { Core, Camelize, Operation, DateInput, ResponseAdapter } from '@moralisweb3/common-core';
import { EvmAddress, EvmAddressish, EvmChainish, EvmChainResolver } from '@moralisweb3/common-evm-utils';
import { operations } from '../../generated/types';

type OperationId = 'requestChallengeEvm';

type BodyParams = operations[OperationId]['requestBody']['content']['application/json'];
type RequestParams = BodyParams;

type SuccessResponse = operations[OperationId]['responses']['201']['content']['application/json'];

// Exports

export interface RequestChallengeEvmRequest
  extends Camelize<Omit<RequestParams, 'address' | 'chainId' | 'expirationTime' | 'notBefore'>> {
  address: EvmAddressish;
  chainId: EvmChainish;
  expirationTime?: DateInput;
  notBefore?: DateInput;
}

export type RequestChallengeEvmJSONRequest = ReturnType<typeof serializeRequest>;

export type RequestChallengeEvmJSONResponse = SuccessResponse;

export type RequestChallengeEvmResponse = ReturnType<typeof deserializeResponse>;

<<<<<<< HEAD
/** The back channel challenge containing the id to store on the api and the message to be signed by the user */
=======
export interface RequestChallengeEvmResponseAdapter
  extends ResponseAdapter<RequestChallengeEvmResponse, RequestChallengeEvmJSONResponse> {}

>>>>>>> 1201d180ea476c6b85fb8335f8417667fe62d28e
export const requestChallengeEvmOperation: Operation<
  RequestChallengeEvmRequest,
  RequestChallengeEvmJSONRequest,
  RequestChallengeEvmResponse,
  RequestChallengeEvmJSONResponse
> = {
  method: 'POST',
  name: 'requestChallengeEvm',
  id: 'requestChallengeEvm',
  groupName: 'evm',
  urlPathPattern: '/challenge/request/evm',
  bodyParamNames: [
    'domain',
    'chainId',
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

function getRequestBody(request: RequestChallengeEvmRequest, core: Core) {
  return {
    domain: request.domain,
    chainId: EvmChainResolver.resolve(request.chainId, core).hex,
    address: EvmAddress.create(request.address, core).checksum,
    statement: request.statement,
    uri: request.uri,
    expirationTime: request.expirationTime,
    notBefore: request.notBefore,
    resources: request.resources,
    timeout: request.timeout,
  };
}

function deserializeResponse(jsonResponse: RequestChallengeEvmJSONResponse) {
  return jsonResponse;
}

function serializeRequest(request: RequestChallengeEvmRequest, core: Core) {
  return {
    domain: request.domain,
    chainId: EvmChainResolver.resolve(request.chainId, core).decimal.toString(),
    address: EvmAddress.create(request.address, core).checksum,
    statement: request.statement,
    uri: request.uri,
    expirationTime: request.expirationTime,
    notBefore: request.notBefore,
    resources: request.resources,
    timeout: request.timeout,
  };
}

function deserializeRequest(jsonRequest: RequestChallengeEvmJSONRequest, core: Core): RequestChallengeEvmRequest {
  return {
    domain: jsonRequest.domain,
    chainId: EvmChainResolver.resolve(jsonRequest.chainId, core),
    address: EvmAddress.create(jsonRequest.address, core),
    statement: jsonRequest.statement,
    uri: jsonRequest.uri,
    expirationTime: jsonRequest.expirationTime,
    notBefore: jsonRequest.notBefore,
    resources: jsonRequest.resources,
    timeout: jsonRequest.timeout,
  };
}
