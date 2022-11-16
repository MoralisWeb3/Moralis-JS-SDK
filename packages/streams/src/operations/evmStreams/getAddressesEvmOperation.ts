import { Camelize, Core, maybe, PaginatedOperation } from '@moralisweb3/common-core';
import { EvmAddress } from '@moralisweb3/common-evm-utils';
import { operations } from '../openapi';

type OperationId = 'GetAddresses';

type PathParams = operations[OperationId]['parameters']['path'];
type QueryParams = operations[OperationId]['parameters']['query'];
type RequestParams = PathParams & QueryParams;

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface GetAddressesEvmRequest extends Camelize<Omit<RequestParams, 'limit'>> {
  limit?: number;
}

export type GetAddressesEvmJSONRequest = ReturnType<typeof serializeRequest>;

export type GetAddressesEvmJSONResponse = SuccessResponse;

export type GetAddressesEvmResponse = ReturnType<typeof deserializeResponse>;

export const getAddressesEvmOperation: PaginatedOperation<
  GetAddressesEvmRequest,
  GetAddressesEvmJSONRequest,
  GetAddressesEvmResponse,
  GetAddressesEvmJSONResponse['result']
> = {
  method: 'GET',
  name: 'getAddressesEvm',
  id: 'GetAddresses',
  groupName: 'evmStreams',
  urlPathParamNames: ['id'],
  urlSearchParamNames: ['cursor', 'limit'],
  urlPathPattern: '/streams/evm/{id}/address',
  firstPageIndex: 0,

  getRequestUrlParams,
  deserializeResponse,
  serializeRequest,
  deserializeRequest,
};

// Methods

function getRequestUrlParams(request: GetAddressesEvmRequest) {
  return {
    id: request.id,
    limit: maybe(request.limit, String),
    cursor: request.cursor,
  };
}

function deserializeResponse(jsonResponse: GetAddressesEvmJSONResponse, request: GetAddressesEvmRequest, core: Core) {
  return (jsonResponse.result ?? []).map((stream) => ({
    ...stream,
    address: stream.address ? EvmAddress.create(stream.address, core) : undefined,
  }));
}

function serializeRequest(request: GetAddressesEvmRequest) {
  return {
    id: request.id,
    limit: request.limit,
    cursor: request.cursor,
  };
}

function deserializeRequest(jsonRequest: GetAddressesEvmJSONRequest): GetAddressesEvmRequest {
  return {
    id: jsonRequest.id,
    limit: jsonRequest.limit,
    cursor: jsonRequest.cursor,
  };
}
