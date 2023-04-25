import { Camelize, Operation, ResponseAdapter, toCamelCase } from '@moralisweb3/common-core';
import { EvmAddress, EvmAddressish } from '@moralisweb3/common-evm-utils';
import { operations } from '../openapi';

type OperationId = 'DeleteAddressFromStream';
type PathParams = operations[OperationId]['parameters']['path'];
type BodyParams = operations[OperationId]['requestBody']['content']['application/json'];
type RequestParams = PathParams & BodyParams;

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface DeleteAddressEvmRequest extends Camelize<Omit<RequestParams, 'address'>> {
  address: EvmAddressish | EvmAddressish[];
}

export type DeleteAddressEvmJSONRequest = ReturnType<typeof serializeRequest>;

export type DeleteAddressEvmJSONResponse = SuccessResponse;

export type DeleteAddressEvmResponse = ReturnType<typeof deserializeResponse>;

export interface DeleteAddressEvmResponseAdapter
  extends ResponseAdapter<DeleteAddressEvmResponse, DeleteAddressEvmJSONResponse> {}

export const deleteAddressEvmOperation: Operation<
  DeleteAddressEvmRequest,
  DeleteAddressEvmJSONRequest,
  DeleteAddressEvmResponse,
  DeleteAddressEvmJSONResponse
> = {
  method: 'DELETE',
  name: 'deleteAddressEvm',
  id: 'DeleteAddressFromStream',
  groupName: 'evmStreams',
  urlPathParamNames: ['id'],
  urlPathPattern: `/streams/evm/{id}/address`,
  bodyParamNames: ['address'],
  bodyType: 'properties',

  getRequestUrlParams,
  getRequestBody,
  deserializeResponse,
  serializeRequest,
  deserializeRequest,
};

// Methods

function getRequestUrlParams(request: DeleteAddressEvmRequest) {
  return {
    id: request.id,
  };
}

function getRequestBody(request: DeleteAddressEvmRequest) {
  return {
    address: Array.isArray(request.address)
      ? request.address.map((address) => EvmAddress.create(address).lowercase)
      : EvmAddress.create(request.address).lowercase,
  };
}

function deserializeResponse(jsonResponse: DeleteAddressEvmJSONResponse) {
  const data = toCamelCase(jsonResponse);
  return {
    streamId: jsonResponse.streamId,
    address: data.address
      ? typeof data.address === 'string'
        ? EvmAddress.create(data.address)
        : data.address.map((address) => EvmAddress.create(address))
      : undefined,
  };
}

function serializeRequest(request: DeleteAddressEvmRequest) {
  return {
    id: request.id,
    address: Array.isArray(request.address)
      ? request.address.map((address) => EvmAddress.create(address).lowercase)
      : EvmAddress.create(request.address).lowercase,
  };
}

function deserializeRequest(jsonRequest: DeleteAddressEvmJSONRequest): DeleteAddressEvmRequest {
  return {
    id: jsonRequest.id,
    address: Array.isArray(jsonRequest.address)
      ? jsonRequest.address.map((address) => EvmAddress.create(address))
      : EvmAddress.create(jsonRequest.address),
  };
}
