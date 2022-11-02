import { Core, Camelize, Operation, maybe } from '@moralisweb3/common-core';
import { EvmAddress, EvmAddressish } from '../../dataTypes';

import { operations } from '../openapi';

type OperationId = 'resolveAddress';

type PathParams = operations[OperationId]['parameters']['path'];
type RequestParams = PathParams;

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface ResolveAddressRequest extends Camelize<Omit<RequestParams, 'address'>> {
  address?: EvmAddressish;
}

export type ResolveAddressJSONRequest = ReturnType<typeof serializeRequest>;

export type ResolveAddressJSONResponse = SuccessResponse;

export type ResolveAddressResponse = ReturnType<typeof deserializeResponse>;

export const resolveAddressOperation: Operation<
  ResolveAddressRequest,
  ResolveAddressJSONRequest,
  ResolveAddressResponse,
  ResolveAddressJSONResponse
> = {
  method: 'GET',
  name: 'resolveAddress',
  id: 'resolveAddress',
  groupName: 'resolve',
  urlPathPattern: '/resolve/{address}/reverse',
  urlPathParamNames: ['address'],

  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

// Methods

function getRequestUrlParams(request: ResolveAddressRequest, core: Core) {
  return {
    address: maybe(request.address, (address) => EvmAddress.create(address, core).lowercase),
  };
}

function deserializeResponse(jsonResponse: ResolveAddressJSONResponse) {
  return jsonResponse;
}

function serializeRequest(request: ResolveAddressRequest, core: Core) {
  return {
    address: maybe(request.address, (address) => EvmAddress.create(address, core)),
  };
}

function deserializeRequest(jsonRequest: ResolveAddressJSONRequest, core: Core): ResolveAddressRequest {
  return {
    address: maybe(jsonRequest.address, (address) => EvmAddress.create(address, core)),
  };
}
