import { Camelize, Operation, ResponseAdapter } from '@moralisweb3/common-core';
import { AptosAddress, AptosAddressInput } from '@moralisweb3/common-aptos-utils';
import { operations } from '../openapi';

type OperationId = 'aptosStreamsDeleteAddresses';

type PathParams = operations[OperationId]['parameters']['path'];
type BodyParams = operations[OperationId]['requestBody']['content']['application/json'];
type RequestParams = PathParams & BodyParams;

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface DeleteAddressAptosRequest extends Camelize<Omit<RequestParams, 'address'>> {
  address: AptosAddressInput | AptosAddressInput[];
}

export type DeleteAddressAptosJSONRequest = ReturnType<typeof serializeRequest>;

export type DeleteAddressAptosJSONResponse = SuccessResponse;

export type DeleteAddressAptosResponse = ReturnType<typeof deserializeResponse>;

export interface DeleteAddressAptosResponseAdapter
  extends ResponseAdapter<DeleteAddressAptosResponse, DeleteAddressAptosJSONResponse> {}

export const deleteAddressAptosOperation: Operation<
  DeleteAddressAptosRequest,
  DeleteAddressAptosJSONRequest,
  DeleteAddressAptosResponse,
  DeleteAddressAptosJSONResponse
> = {
  method: 'DELETE',
  name: 'deleteAddressAptos',
  id: 'aptosStreamsDeleteAddresses',
  groupName: 'aptosStreams',
  urlPathParamNames: ['id'],
  urlPathPattern: `/streams/aptos/{id}/address`,
  bodyParamNames: ['address'],
  bodyType: 'properties',

  getRequestUrlParams,
  getRequestBody,
  deserializeResponse,
  serializeRequest,
  deserializeRequest,
};

// Methods

function getRequestUrlParams(request: DeleteAddressAptosRequest) {
  return {
    id: request.id,
  };
}

function getRequestBody(request: DeleteAddressAptosRequest) {
  return {
    address: Array.isArray(request.address)
      ? request.address.map((address) => AptosAddress.create(address).address)
      : AptosAddress.create(request.address).address,
  };
}

function deserializeResponse(jsonResponse: DeleteAddressAptosJSONResponse) {
  return jsonResponse;
}

function serializeRequest(request: DeleteAddressAptosRequest) {
  return {
    id: request.id,
    address: Array.isArray(request.address)
      ? request.address.map((address) => AptosAddress.create(address).address)
      : AptosAddress.create(request.address).address,
  };
}

function deserializeRequest(jsonRequest: DeleteAddressAptosJSONRequest): DeleteAddressAptosRequest {
  return {
    id: jsonRequest.id,
    address: Array.isArray(jsonRequest.address)
      ? jsonRequest.address.map((address) => AptosAddress.create(address))
      : AptosAddress.create(jsonRequest.address),
  };
}
