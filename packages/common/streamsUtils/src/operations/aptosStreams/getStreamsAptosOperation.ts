import { Camelize, maybe, PaginatedOperation, PaginatedResponseAdapter } from '@moralisweb3/common-core';
import { AptosStream } from '../../dataTypes';
import { operations } from '../openapi';

type OperationId = 'aptosStreamsGetAll';

type QueryParams = operations[OperationId]['parameters']['query'];
type RequestParams = QueryParams;

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface GetStreamsAptosRequest extends Camelize<RequestParams> {}

export type GetStreamsAptosJSONRequest = ReturnType<typeof serializeRequest>;

export type GetStreamsAptosJSONResponse = SuccessResponse;

export type GetStreamsAptosResponse = ReturnType<typeof deserializeResponse>;

export interface GetStreamsAptosResponseAdapter
  extends PaginatedResponseAdapter<GetStreamsAptosResponse, GetStreamsAptosJSONResponse['result']> {}

export const getStreamsAptosOperation: PaginatedOperation<
  GetStreamsAptosRequest,
  GetStreamsAptosJSONRequest,
  GetStreamsAptosResponse,
  GetStreamsAptosJSONResponse['result']
> = {
  method: 'GET',
  name: 'getStreamsAptos',
  id: 'aptosStreamsGetAll',
  groupName: 'aptosStreams',
  urlSearchParamNames: ['cursor', 'limit'],
  urlPathPattern: '/streams/aptos',
  firstPageIndex: 0,

  getRequestUrlParams,
  deserializeResponse,
  serializeRequest,
  deserializeRequest,
};

// Methods

function getRequestUrlParams(request: GetStreamsAptosRequest) {
  return {
    limit: maybe(request.limit, String),
    cursor: request.cursor,
  };
}

function deserializeResponse(jsonResponse: GetStreamsAptosJSONResponse) {
  return (jsonResponse.result ?? []).map((stream) => AptosStream.create(stream));
}

function serializeRequest(request: GetStreamsAptosRequest) {
  return {
    cursor: request.cursor,
    limit: request.limit,
  };
}

function deserializeRequest(jsonRequest: GetStreamsAptosJSONRequest): GetStreamsAptosRequest {
  return {
    cursor: jsonRequest.cursor,
    limit: jsonRequest.limit,
  };
}
