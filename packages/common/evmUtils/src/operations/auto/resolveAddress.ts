import { Core, Camelize, Operation,  } from '@moralisweb3/common-core';
import { EvmAddress,EvmAddressish, } from '../../dataTypes';

import { operations } from '../openapi';

type OperationId = 'resolveAddress';

type PathParams = operations[OperationId]['parameters']['path'];





type RequestParams = PathParams  ;


type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface ResolveAddressRequest extends Camelize<Omit<RequestParams,  | 'address'>> {
      address: EvmAddressish;
}

export type ResolveAddressJSONRequest = ReturnType<typeof serializeRequest>;

export type ResolveAddressJSONResponse = SuccessResponse;

export type ResolveAddressResponse = ReturnType<typeof deserializeResponse>;

export const ResolveAddressOperation: Operation<
  ResolveAddressRequest,
  ResolveAddressJSONRequest,
  ResolveAddressResponse,
  ResolveAddressJSONResponse
> = {
  method: 'GET',
  name: 'resolveAddress',
  id: 'resolveAddress',
  groupName: 'token',
  urlPathPattern: '/resolve/{address}/reverse',
  urlPathParamNames: ['address',],
  

  
  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

// Methods



function getRequestUrlParams(request: ResolveAddressRequest, core: Core) {
  return {
      address: EvmAddress.create(request.address, core).lowercase,
  };
}

function serializeRequest(request: ResolveAddressRequest, core: Core) {
  return {
      address: request.address.toString(),
  };
}

function deserializeRequest(
  jsonRequest: ResolveAddressJSONRequest,
  core: Core,
): ResolveAddressRequest {
  return {
      address: EvmAddress.create(jsonRequest.address, core),
  };
}

function deserializeResponse(jsonResponse: ResolveAddressJSONResponse) {
  return jsonResponse;
}
