import { Camelize, Operation } from '@moralisweb3/common-core';
import { operations } from '../../generated/types';

type OperationId = 'ReplayHistory';

type PathParams = operations[OperationId]['parameters']['path'];
type RequestParams = PathParams;

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface ReplayHistoryRequest extends Camelize<RequestParams>  {}

export type ReplayHistoryJSONRequest = ReturnType<typeof serializeRequest>;

export type ReplayHistoryJSONResponse = SuccessResponse;

export type ReplayHistoryResponse = ReturnType<typeof deserializeResponse>;

export const replayHistoryOperation: Operation<
  ReplayHistoryRequest,
  ReplayHistoryJSONRequest,
  ReplayHistoryResponse,
  ReplayHistoryJSONResponse
> = {
  method: 'POST',
  name: 'replayHistory',
  id: 'replayHistory',
  groupName: 'streams',
  urlPathPattern: '/history/replay/{streamId}/{id}',
  urlPathParamNames: ['streamId', 'id'],
  bodyParamNames: [],
  bodyType: 'properties',

  getRequestUrlParams,
  getRequestBody,
  deserializeResponse,
  serializeRequest,
  deserializeRequest,
};

// Methods

function getRequestUrlParams(request: ReplayHistoryRequest) {
  return {
    streamId: request.streamId,
    id: request.id,
  };
}

function getRequestBody() {
  return {};
}

function deserializeResponse(jsonResponse: ReplayHistoryJSONResponse) {
  return jsonResponse;
}

function serializeRequest(request: ReplayHistoryRequest) {
  return {
    streamId: request.streamId,
    id: request.id,
  };
}

function deserializeRequest(jsonRequest: ReplayHistoryJSONRequest) {
  return {
    streamId: jsonRequest.streamId,
    id: jsonRequest.id,
  };
}
