import { Camelize, maybe, PaginatedOperation } from '@moralisweb3/common-core';
import { operations } from '../../generated/types';

type OperationId = 'GetHistory';

type QueryParams = operations[OperationId]['parameters']['query'];
type RequestParams = QueryParams;

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface GetHistoryRequest extends Camelize<RequestParams> {}

export type GetHistoryJSONRequest = ReturnType<typeof serializeRequest>;

export type GetHistoryJSONResponse = SuccessResponse;

export type GetHistoryResponse = ReturnType<typeof deserializeResponse>;

export const getHistoryOperation: PaginatedOperation<
  GetHistoryRequest,
  GetHistoryJSONRequest,
  GetHistoryResponse,
  GetHistoryJSONResponse['result']
> = {
  method: 'GET',
  name: 'getHistory',
  id: 'getHistory',
  groupName: 'streams',
  urlPathPattern: '/history',
  urlSearchParamNames: ['excludePayload', 'limit', 'cursor'],
  firstPageIndex: 0,

  getRequestUrlParams,
  deserializeResponse,
  serializeRequest,
  deserializeRequest,
};

// Methods

function getRequestUrlParams(request: GetHistoryRequest) {
  return {
    excludePayload: maybe(request.excludePayload, String),
    limit: maybe(request.limit, String),
    cursor: request.cursor,
  };
}

function deserializeResponse(jsonResponse: GetHistoryJSONResponse) {
  return (jsonResponse.result ?? []);
}

function serializeRequest(request: GetHistoryRequest) {
  return request;
}

function deserializeRequest(jsonRequest: GetHistoryJSONRequest) {
  return jsonRequest;
}
