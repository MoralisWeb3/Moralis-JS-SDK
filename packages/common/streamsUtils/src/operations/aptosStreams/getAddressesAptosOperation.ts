import { AptosAddress } from '@moralisweb3/common-aptos-utils';
import { Camelize, maybe, Operation, ResponseAdapter } from '@moralisweb3/common-core';
import { operations } from '../openapi';

type OperationId = 'aptosStreamsGetAddresses';

type PathParams = operations[OperationId]['parameters']['path'];
type QueryParams = operations[OperationId]['parameters']['query'];
type RequestParams = PathParams & QueryParams;

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface GetAddressesAptosRequest extends Camelize<Omit<RequestParams, 'limit'>> {
  limit?: number;
}

export type GetAddressesAptosJSONRequest = ReturnType<typeof serializeRequest>;

export type GetAddressesAptosJSONResponse = SuccessResponse;

export type GetAddressesAptosResponse = ReturnType<typeof deserializeResponse>;

export interface GetAddressesAptosResponseAdapter
  extends ResponseAdapter<GetAddressesAptosResponse, GetAddressesAptosJSONResponse> {}

export const getAddressesAptosOperation: Operation<
  GetAddressesAptosRequest,
  GetAddressesAptosJSONRequest,
  GetAddressesAptosResponse,
  GetAddressesAptosJSONResponse
> = {
  method: 'GET',
  name: 'getAddressesAptos',
  id: 'aptosStreamsGetAddresses',
  groupName: 'aptosStreams',
  urlPathParamNames: ['id'],
  urlSearchParamNames: ['cursor', 'limit'],
  urlPathPattern: '/streams/aptos/{id}/address',
  firstPageIndex: 0,

  getRequestUrlParams,
  deserializeResponse,
  serializeRequest,
  deserializeRequest,
};

// Methods

function getRequestUrlParams(request: GetAddressesAptosRequest) {
  return {
    id: request.id,
    limit: maybe(request.limit, String),
    cursor: request.cursor,
  };
}

function deserializeResponse(jsonResponse: GetAddressesAptosJSONResponse) {
  return {
    result: (jsonResponse.result ?? []).map((address) => AptosAddress.create(address.address)),
    total: jsonResponse.total,
  };
}

function serializeRequest(request: GetAddressesAptosRequest) {
  return {
    id: request.id,
    limit: request.limit,
    cursor: request.cursor,
  };
}

function deserializeRequest(jsonRequest: GetAddressesAptosJSONRequest): GetAddressesAptosRequest {
  return {
    id: jsonRequest.id,
    limit: jsonRequest.limit,
    cursor: jsonRequest.cursor,
  };
}
