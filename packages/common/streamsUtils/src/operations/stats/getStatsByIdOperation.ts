import { Camelize, Operation } from '@moralisweb3/common-core';
import { operations } from '../openapi';

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
  id: 'GetStatsByStreamId',
  groupName: 'stats',
  urlPathPattern: '/stats/{streamId}',
  urlPathParamNames: ['streamId'],

  getRequestUrlParams,
  deserializeResponse,
  serializeRequest,
  deserializeRequest,
};

// Methods

function getRequestUrlParams(request: GetStatsByIdRequest) {
  return {
    streamId: request.streamId,
  };
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
