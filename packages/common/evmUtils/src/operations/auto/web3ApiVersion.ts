import { Operation } from '@moralisweb3/common-core';


import { operations } from '../openapi';

type OperationId = 'web3ApiVersion';










type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

//RunContractFunctionRequest

// Exports


export interface Web3ApiVersionRequest  {
}

export type Web3ApiVersionJSONRequest = undefined;

export type Web3ApiVersionJSONResponse = SuccessResponse;

export type Web3ApiVersionResponse = ReturnType<typeof deserializeResponse>;

export const Web3ApiVersionOperation: Operation<
  Web3ApiVersionRequest,
  Web3ApiVersionJSONRequest,
  Web3ApiVersionResponse,
  Web3ApiVersionJSONResponse
> = {
  method: 'GET',
  name: 'web3ApiVersion',
  id: 'web3ApiVersion',
  groupName: 'token',
  urlPathPattern: '/web3/version',
  
  

  
  deserializeResponse,
};

// Methods




function deserializeResponse(jsonResponse: Web3ApiVersionJSONResponse) {
  return jsonResponse;
}