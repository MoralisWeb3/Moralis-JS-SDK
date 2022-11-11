import { Camelize, Operation } from '@moralisweb3/common-core';
import { operations } from '../../generated/types';

type OperationId = 'GetStatsByStreamId';

type PathParams = operations[OperationId]['parameters']['path'];
type RequestParams = PathParams;

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface GetStatsByIdRequest extends Camelize<RequestParams> {}

export type GetStatsByIdJSONRequest = ReturnType<typeof serializeRequest>;

export type GetStatsByIdJSONResponse = SuccessResponse;

export type GetStatsByIdResponse = ReturnType<typeof deserializeResponse>;

export const getStatsByIdOperation: Operation<
  GetStatsByIdRequest,
  GetStatsByIdJSONRequest,
  GetStatsByIdResponse,
  GetStatsByIdJSONResponse
> = {
  method: 'GET',
  name: 'getStatsById',
  id: 'getStatsById',
  groupName: 'streams',
  urlPathPattern: '/stats/{streamId}',
  urlPathParamNames: ['streamId'],

  getRequestUrlParams,
  deserializeResponse,
  serializeRequest,
  deserializeRequest,
};

// Methods

function getRequestUrlParams(request: GetStatsByIdRequest) {
  return request;
}

function deserializeResponse(jsonResponse: GetStatsByIdJSONResponse) {
  return jsonResponse;
}

function serializeRequest(request: GetStatsByIdRequest) {
  return request;
}

function deserializeRequest(jsonRequest: GetStatsByIdJSONRequest) {
  return jsonRequest;
}
