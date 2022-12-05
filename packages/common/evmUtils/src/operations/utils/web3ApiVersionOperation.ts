import { Operation, ResponseAdapter } from '@moralisweb3/common-core';

import { operations } from '../openapi';

type OperationId = 'web3ApiVersion';

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface Web3ApiVersionRequest {}

export type Web3ApiVersionJSONRequest = undefined;

export type Web3ApiVersionJSONResponse = SuccessResponse;

export type Web3ApiVersionResponse = ReturnType<typeof deserializeResponse>;

export interface Web3ApiVersionResponseAdapter
  extends ResponseAdapter<Web3ApiVersionResponse, Web3ApiVersionJSONResponse> {}

/** Get the current version of the Moralis Web3 API. */
export const web3ApiVersionOperation: Operation<
  Web3ApiVersionRequest,
  Web3ApiVersionJSONRequest,
  Web3ApiVersionResponse,
  Web3ApiVersionJSONResponse
> = {
  method: 'GET',
  name: 'web3ApiVersion',
  id: 'web3ApiVersion',
  groupName: 'utils',
  urlPathPattern: '/web3/version',

  deserializeRequest,
  serializeRequest,
  getRequestUrlParams,
  deserializeResponse,
};

// Methods

function getRequestUrlParams() {
  return {};
}

function serializeRequest() {
  return undefined;
}

function deserializeRequest() {
  return {};
}

function deserializeResponse(jsonResponse: Web3ApiVersionJSONResponse) {
  return jsonResponse;
}
