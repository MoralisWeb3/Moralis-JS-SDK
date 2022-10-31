import { Operation,  } from '@moralisweb3/common-core';


import { operations } from '../openapi';

type OperationId = 'uploadFolder';










type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface UploadFolderRequest  {
}

export type UploadFolderJSONRequest = undefined;

export type UploadFolderJSONResponse = SuccessResponse;

export type UploadFolderResponse = ReturnType<typeof deserializeResponse>;

export const UploadFolderOperation: Operation<
  UploadFolderRequest,
  UploadFolderJSONRequest,
  UploadFolderResponse,
  UploadFolderJSONResponse
> = {
  method: 'POST',
  name: 'uploadFolder',
  id: 'uploadFolder',
  groupName: 'token',
  urlPathPattern: '/ipfs/uploadFolder',
  
  

  
  deserializeResponse,
};

// Methods




function deserializeResponse(jsonResponse: UploadFolderJSONResponse) {
  return jsonResponse;
}