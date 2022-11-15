import { Operation } from '@moralisweb3/common-core';
import { operations } from '../openapi';

type OperationId = 'GetSettings';

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface GetSettingsRequest {}

export type GetSettingsJSONRequest = undefined;

export type GetSettingsJSONResponse = SuccessResponse;

export type GetSettingsResponse = ReturnType<typeof deserializeResponse>;

export const getSettingsOperation: Operation<
  GetSettingsRequest,
  GetSettingsJSONRequest,
  GetSettingsResponse,
  GetSettingsJSONResponse
> = {
  method: 'GET',
  name: 'getSettings',
  id: 'GetSettings',
  groupName: 'project',
  urlPathPattern: '/settings',

  getRequestUrlParams,
  deserializeResponse,
  serializeRequest,
  deserializeRequest,
};

// Methods

function getRequestUrlParams() {
  return {};
}

function deserializeResponse(jsonResponse: GetSettingsJSONResponse) {
  return jsonResponse;
}

function serializeRequest() {
  return undefined;
}

function deserializeRequest() {
  return {};
}
