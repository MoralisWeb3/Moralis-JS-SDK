import { Camelize, Core, Operation } from '@moralisweb3/common-core';
import { EvmAddress, EvmAddressish } from '@moralisweb3/common-evm-utils';
import { operations } from '../../generated/types';

type OperationId = 'AddAddressToStream';

type PathParams = operations[OperationId]['parameters']['path'];
type BodyParams = operations[OperationId]['requestBody']['content']['application/json'];
type RequestParams = PathParams & BodyParams;

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface AddAddressEvmRequest extends Camelize<Omit<RequestParams, 'address'>> {
  address: EvmAddressish | EvmAddressish[];
}

export type AddAddressEvmJSONRequest = ReturnType<typeof serializeRequest>;

export type AddAddressEvmJSONResponse = SuccessResponse;

export type AddAddressEvmResponse = ReturnType<typeof deserializeResponse>;

export const addAddressEvmOperation: Operation<
  AddAddressEvmRequest,
  AddAddressEvmJSONRequest,
  AddAddressEvmResponse,
  AddAddressEvmJSONResponse
> = {
  method: 'POST',
  name: 'addAddressEvm',
  id: 'AddAddressToStream',
  groupName: 'evmStreams',
  urlPathPattern: '/streams/evm/{id}/address',
  bodyParamNames: ['address'],
  urlPathParamNames: ['id'],
  bodyType: 'properties',

  getRequestUrlParams,
  getRequestBody,
  deserializeResponse,
  serializeRequest,
  deserializeRequest,
};

// Methods

function getRequestUrlParams(request: AddAddressEvmRequest) {
  return {
    id: request.id,
  };
}

function getRequestBody(request: AddAddressEvmRequest, core: Core) {
  let address;
  if (Array.isArray(request.address)) {
    address = request.address.map((a) => EvmAddress.create(a, core).checksum);
  } else {
    address = EvmAddress.create(request.address, core).checksum;
  }
  return {
    address,
  };
}

function deserializeResponse(jsonResponse: AddAddressEvmJSONResponse) {
  return jsonResponse;
}

function serializeRequest(request: AddAddressEvmRequest, core: Core) {
  let address;
  if (Array.isArray(request.address)) {
    address = request.address.map((a) => EvmAddress.create(a, core).checksum);
  } else {
    address = EvmAddress.create(request.address, core).checksum;
  }
  return {
    id: request.id,
    address,
  };
}

function deserializeRequest(jsonRequest: AddAddressEvmJSONRequest, core: Core) {
  let address;
  if (Array.isArray(jsonRequest.address)) {
    address = jsonRequest.address.map((a) => EvmAddress.create(a, core));
  } else {
    address = EvmAddress.create(jsonRequest.address, core);
  }
  return {
    id: jsonRequest.id,
    address,
  };
}
