import { Camelize, Operation } from '@moralisweb3/common-core';
import { operations } from '../../generated/types';

type OperationId = 'SetSettings';

type BodyParams = operations[OperationId]['requestBody']['content']['application/json'];
type RequestParams = BodyParams;

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface SetSettingsRequest extends Camelize<RequestParams> {}

export type SetSettingsJSONRequest = ReturnType<typeof serializeRequest>;

export type SetSettingsJSONResponse = SuccessResponse;

export type SetSettingsResponse = ReturnType<typeof deserializeResponse>;

export const setSettingsOperation: Operation<
  SetSettingsRequest,
  SetSettingsJSONRequest,
  SetSettingsResponse,
  SetSettingsJSONResponse
> = {
  method: 'POST',
  name: 'setSettings',
  id: 'SetSettings',
  groupName: 'project',
  urlPathPattern: '/settings',
  bodyParamNames: ['region'],
  bodyType: 'properties',

  getRequestUrlParams,
  getRequestBody,
  deserializeResponse,
  serializeRequest,
  deserializeRequest,
};

// Methods

function getRequestUrlParams() {
  return {};
}

function getRequestBody(request: SetSettingsRequest) {
  return {
    region: request.region,
  };
}

function deserializeResponse(jsonResponse: SetSettingsJSONResponse) {
  return jsonResponse;
}

function serializeRequest(request: SetSettingsRequest) {
  return {
    region: request.region,
  };
}

function deserializeRequest(jsonRequest: SetSettingsJSONRequest) {
  return {
    region: jsonRequest.region,
  };
}
