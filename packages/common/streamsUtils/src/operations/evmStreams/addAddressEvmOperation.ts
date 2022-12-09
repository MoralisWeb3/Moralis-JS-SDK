import { Camelize, Core, Operation, ResponseAdapter, toCamelCase } from '@moralisweb3/common-core';
import { EvmAddress, EvmAddressish } from '@moralisweb3/common-evm-utils';
import { operations } from '../openapi';

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

export interface AddAddressEvmResponseAdapter
  extends ResponseAdapter<AddAddressEvmResponse, AddAddressEvmJSONResponse> {}

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
  return {
    address: Array.isArray(request.address)
      ? request.address.map((a) => EvmAddress.create(a, core).checksum)
      : EvmAddress.create(request.address, core).checksum,
  };
}

function deserializeResponse(jsonResponse: AddAddressEvmJSONResponse) {
  const data = toCamelCase(jsonResponse);
  return {
    ...data,
    address: data.address
      ? typeof data.address === 'string'
        ? EvmAddress.create(data.address)
        : data.address.map((address) => EvmAddress.create(address))
      : undefined,
  };
}

function serializeRequest(request: AddAddressEvmRequest, core: Core) {
  return {
    id: request.id,
    address: Array.isArray(request.address)
      ? request.address.map((a) => EvmAddress.create(a, core).checksum)
      : EvmAddress.create(request.address, core).checksum,
  };
}

function deserializeRequest(jsonRequest: AddAddressEvmJSONRequest, core: Core) {
  return {
    id: jsonRequest.id,
    address: Array.isArray(jsonRequest.address)
      ? jsonRequest.address.map((a) => EvmAddress.create(a, core))
      : EvmAddress.create(jsonRequest.address, core),
  };
}
