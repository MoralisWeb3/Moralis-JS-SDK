import { Core, Camelize, maybe, PaginatedOperation } from '@moralisweb3/common-core';
import { EvmStream } from '../../dataTypes';
import { operations } from '../openapi';

type OperationId = 'GetStreams';

type QueryParams = operations[OperationId]['parameters']['query'];
type RequestParams = QueryParams;

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface GetStreamsEvmRequest extends Camelize<RequestParams> {}

export type GetStreamsEvmJSONRequest = ReturnType<typeof serializeRequest>;

export type GetStreamsEvmJSONResponse = SuccessResponse;

export type GetStreamsEvmResponse = ReturnType<typeof deserializeResponse>;

export const getStreamsEvmOperation: PaginatedOperation<
  GetStreamsEvmRequest,
  GetStreamsEvmJSONRequest,
  GetStreamsEvmResponse,
  GetStreamsEvmJSONResponse['result']
> = {
  method: 'GET',
  name: 'getStreamsEvm',
  id: 'GetStreams',
  groupName: 'evmStreams',
  urlSearchParamNames: ['cursor', 'limit'],
  urlPathPattern: '/streams/evm',
  firstPageIndex: 0,

  getRequestUrlParams,
  deserializeResponse,
  serializeRequest,
  deserializeRequest,
};

// Methods

function getRequestUrlParams(request: GetStreamsEvmRequest) {
  return {
    limit: maybe(request.limit, String),
    cursor: request.cursor,
  };
}

function deserializeResponse(jsonResponse: GetStreamsEvmJSONResponse, request: GetStreamsEvmRequest, core: Core) {
  return (jsonResponse.result ?? []).map((stream) => EvmStream.create(stream, core));
}

function serializeRequest(request: GetStreamsEvmRequest) {
  return {
    cursor: request.cursor,
    limit: request.limit,
  };
}

function deserializeRequest(jsonRequest: GetStreamsEvmJSONRequest): GetStreamsEvmRequest {
  return {
    cursor: jsonRequest.cursor,
    limit: jsonRequest.limit,
  };
}
