import { Operation } from '@moralisweb3/common-core';
import { operations } from '../openapi';

type OperationId = 'GetStats';

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface GetStatsRequest {}

export type GetStatsJSONRequest = undefined;

export type GetStatsJSONResponse = SuccessResponse;

export type GetStatsResponse = ReturnType<typeof deserializeResponse>;

export const getStatsOperation: Operation<
  GetStatsRequest,
  GetStatsJSONRequest,
  GetStatsResponse,
  GetStatsJSONResponse
> = {
  method: 'GET',
  name: 'getStats',
  id: 'getStats',
  groupName: 'streams',
  urlPathPattern: '/stats',

  getRequestUrlParams,
  deserializeResponse,
  serializeRequest,
  deserializeRequest,
};

// Methods

function getRequestUrlParams() {
  return {};
}

function deserializeResponse(jsonResponse: GetStatsJSONResponse) {
  return jsonResponse;
}

function serializeRequest() {
  return undefined;
}

function deserializeRequest() {
  return {};
}
