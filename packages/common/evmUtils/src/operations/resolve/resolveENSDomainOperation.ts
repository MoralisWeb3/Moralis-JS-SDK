import { Camelize, Operation, ResponseAdapter } from '@moralisweb3/common-core';
import { EvmAddress } from '../../dataTypes';

import { operations } from '../openapi';

type OperationId = 'resolveENSDomain';

type PathParams = operations[OperationId]['parameters']['path'];
type RequestParams = PathParams;

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface ResolveENSDomainRequest extends Camelize<RequestParams> {}

export type ResolveENSDomainJSONRequest = ReturnType<typeof serializeRequest>;

export type ResolveENSDomainJSONResponse = SuccessResponse;

export type ResolveENSDomainResponse = ReturnType<typeof deserializeResponse>;

export interface ResolveENSDomainResponseAdapter
  extends ResponseAdapter<ResolveENSDomainResponse, ResolveENSDomainJSONResponse> {}

/** Resolve a specific ENS domain to its address. */
export const resolveENSDomainOperation: Operation<
  ResolveENSDomainRequest,
  ResolveENSDomainJSONRequest,
  ResolveENSDomainResponse,
  ResolveENSDomainJSONResponse
> = {
  method: 'GET',
  name: 'resolveENSDomain',
  id: 'resolveENSDomain',
  groupName: 'resolve',
  isNullable: true,
  urlPathPattern: '/resolve/ens/{domain}',
  urlPathParamNames: ['domain'],

  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

// Methods

function getRequestUrlParams(request: ResolveENSDomainRequest) {
  return {
    domain: request.domain,
  };
}

function serializeRequest(request: ResolveENSDomainRequest) {
  return {
    domain: request.domain,
  };
}

function deserializeRequest(jsonRequest: ResolveENSDomainJSONRequest): ResolveENSDomainRequest {
  return {
    domain: jsonRequest.domain,
  };
}

function deserializeResponse(jsonResponse: ResolveENSDomainJSONResponse) {
  return {
    address: EvmAddress.create(jsonResponse.address),
  };
}
