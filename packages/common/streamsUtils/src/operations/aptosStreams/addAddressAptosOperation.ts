import { Camelize, Operation, ResponseAdapter, toCamelCase } from '@moralisweb3/common-core';
import { AptosAddress, AptosAddressish } from '@moralisweb3/common-aptos-utils';
import { operations } from '../openapi';

type OperationId = 'aptosStreamsAddAddresses';

type PathParams = operations[OperationId]['parameters']['path'];
type BodyParams = operations[OperationId]['requestBody']['content']['application/json'];
type RequestParams = PathParams & BodyParams;

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface AddAddressAptosRequest extends Camelize<Omit<RequestParams, 'address'>> {
  address: AptosAddressish | AptosAddressish[];
}

export type AddAddressAptosJSONRequest = ReturnType<typeof serializeRequest>;

export type AddAddressAptosJSONResponse = SuccessResponse;

export type AddAddressAptosResponse = ReturnType<typeof deserializeResponse>;

export interface AddAddressAptosResponseAdapter
  extends ResponseAdapter<AddAddressAptosResponse, AddAddressAptosJSONResponse> {}

export const addAddressAptosOperation: Operation<
  AddAddressAptosRequest,
  AddAddressAptosJSONRequest,
  AddAddressAptosResponse,
  AddAddressAptosJSONResponse
> = {
  method: 'POST',
  name: 'addAddressAptos',
  id: 'aptosStreamsAddAddresses',
  groupName: 'aptosStreams',
  urlPathPattern: '/streams/aptos/{id}/address',
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

function getRequestUrlParams(request: AddAddressAptosRequest) {
  return {
    id: request.id,
  };
}

function getRequestBody(request: AddAddressAptosRequest) {
  return {
    address: Array.isArray(request.address)
      ? request.address.map((a) => AptosAddress.create(a).address)
      : AptosAddress.create(request.address).address,
  };
}

function deserializeResponse(jsonResponse: AddAddressAptosJSONResponse) {
  const data = toCamelCase(jsonResponse);
  return {
    ...data,
    address: data.address
      ? typeof data.address === 'string'
        ? AptosAddress.create(data.address)
        : data.address.map((address) => AptosAddress.create(address))
      : undefined,
  };
}

function serializeRequest(request: AddAddressAptosRequest) {
  return {
    id: request.id,
    address: Array.isArray(request.address)
      ? request.address.map((a) => AptosAddress.create(a).address)
      : AptosAddress.create(request.address).address,
  };
}

function deserializeRequest(jsonRequest: AddAddressAptosJSONRequest) {
  return {
    id: jsonRequest.id,
    address: Array.isArray(jsonRequest.address)
      ? jsonRequest.address.map((a) => AptosAddress.create(a))
      : AptosAddress.create(jsonRequest.address),
  };
}
