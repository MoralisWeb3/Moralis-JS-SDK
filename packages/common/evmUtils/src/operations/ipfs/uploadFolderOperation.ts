import { Operation } from '@moralisweb3/common-core';

import { operations } from '../openapi';

type OperationId = 'uploadFolder';

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface UploadFolderRequest {
  // TODO: needs refinement, the key should not be abi
  abi: {
    path: string;
    content: string;
  }[];
}

export type UploadFolderJSONRequest = ReturnType<typeof serializeRequest>;

export type UploadFolderJSONResponse = SuccessResponse;

export type UploadFolderResponse = ReturnType<typeof deserializeResponse>;

export const uploadFolderOperation: Operation<
  UploadFolderRequest,
  UploadFolderJSONRequest,
  UploadFolderResponse,
  UploadFolderJSONResponse
> = {
  method: 'POST',
  name: 'uploadFolder',
  id: 'uploadFolder',
  groupName: 'ipfs',
  urlPathPattern: '/ipfs/uploadFolder',
  urlPathParamNames: [],
  bodyType: 'raw',
  bodyParamNames: ['abi'],
  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
  getRequestBody,
};

// Methods
function getRequestUrlParams(_: UploadFolderRequest) {
  return {};
}

function getRequestBody(request: UploadFolderRequest) {
  return {
    abi: request.abi,
  };
}

function deserializeResponse(jsonResponse: UploadFolderJSONResponse) {
  return jsonResponse;
}

function serializeRequest(request: UploadFolderRequest) {
  return {
    abi: JSON.stringify(request.abi),
  };
}

function deserializeRequest(jsonRequest: UploadFolderJSONRequest): UploadFolderRequest {
  return {
    abi: JSON.parse(jsonRequest.abi),
  };
}
