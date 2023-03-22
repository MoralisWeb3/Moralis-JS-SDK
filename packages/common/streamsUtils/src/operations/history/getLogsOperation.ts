import { Camelize, maybe, PaginatedOperation } from '@moralisweb3/common-core';
import { EvmChain } from '@moralisweb3/common-evm-utils';
import { operations } from '../openapi';

type OperationId = 'GetLogs';

type QueryParams = operations[OperationId]['parameters']['query'];
type RequestParams = QueryParams;

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface GetLogsRequest extends Camelize<RequestParams> {}

export type GetLogsJSONRequest = ReturnType<typeof serializeRequest>;

export type GetLogsJSONResponse = SuccessResponse;

export type GetLogsResponse = ReturnType<typeof deserializeResponse>;

export const getLogsOperation: PaginatedOperation<
  GetLogsRequest,
  GetLogsJSONRequest,
  GetLogsResponse,
  GetLogsJSONResponse['result']
> = {
  method: 'GET',
  name: 'getLogs',
  id: 'GetLogs',
  groupName: 'history',
  urlPathPattern: '/history/logs',
  urlSearchParamNames: ['limit', 'cursor'],
  firstPageIndex: 0,

  getRequestUrlParams,
  deserializeResponse,
  serializeRequest,
  deserializeRequest,
};

// Methods

function getRequestUrlParams(request: GetLogsRequest) {
  return {
    limit: maybe(request.limit, String),
    cursor: request.cursor,
  };
}

function deserializeResponse(jsonResponse: GetLogsJSONResponse) {
  return (jsonResponse.result ?? []).map((result) => ({
    ...result,
    chain: EvmChain.create(result.chain),
  }));
}

function serializeRequest(request: GetLogsRequest) {
  return request;
}

function deserializeRequest(jsonRequest: GetLogsJSONRequest) {
  return jsonRequest;
}
