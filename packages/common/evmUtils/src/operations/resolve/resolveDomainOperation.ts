import Core, { Camelize, Operation, ResponseAdapter } from '@moralisweb3/common-core';
import { EvmAddress } from '../../dataTypes';

import { operations } from '../openapi';

type OperationId = 'resolveDomain';

type PathParams = operations[OperationId]['parameters']['path'];
type QueryParams = operations[OperationId]['parameters']['query'];
type RequestParams = PathParams & QueryParams;

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface ResolveDomainRequest extends Camelize<RequestParams> {}

export type ResolveDomainJSONRequest = ReturnType<typeof serializeRequest>;

export type ResolveDomainJSONResponse = SuccessResponse;

export type ResolveDomainResponse = ReturnType<typeof deserializeResponse>;

export interface ResolveDomainResponseAdapter
  extends ResponseAdapter<ResolveDomainResponse, ResolveDomainJSONResponse> {}

/** Resolve an Unstoppable domain and get the address. */
export const resolveDomainOperation: Operation<
  ResolveDomainRequest,
  ResolveDomainJSONRequest,
  ResolveDomainResponse,
  ResolveDomainJSONResponse
> = {
  method: 'GET',
  name: 'resolveDomain',
  id: 'resolveDomain',
  groupName: 'resolve',
  isNullable: true,
  urlPathPattern: '/resolve/{domain}',
  urlPathParamNames: ['domain'],
  urlSearchParamNames: ['currency'],

  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

// Methods

function getRequestUrlParams(request: ResolveDomainRequest) {
  return {
    currency: request.currency,
    domain: request.domain,
  };
}

function serializeRequest(request: ResolveDomainRequest) {
  return {
    currency: request.currency,
    domain: request.domain,
  };
}

function deserializeRequest(jsonRequest: ResolveDomainJSONRequest): ResolveDomainRequest {
  return {
    currency: jsonRequest.currency,
    domain: jsonRequest.domain,
  };
}

function deserializeResponse(jsonResponse: ResolveDomainJSONResponse, request: ResolveDomainRequest, core: Core) {
  return {
    address: EvmAddress.create(jsonResponse.address, core),
  };
}
