import { Core, Camelize, Operation } from '@moralisweb3/common-core';


import { operations } from '../openapi';

type OperationId = 'resolveDomain';

type PathParams = operations[OperationId]['parameters']['path'];

type QueryParams = operations[OperationId]['parameters']['query'];



type RequestParams = PathParams & QueryParams ;


type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

//RunContractFunctionRequest

// Exports


export interface ResolveDomainRequest extends Camelize<RequestParams> {
}

export type ResolveDomainJSONRequest = ReturnType<typeof serializeRequest>;

export type ResolveDomainJSONResponse = SuccessResponse;

export type ResolveDomainResponse = ReturnType<typeof deserializeResponse>;

export const ResolveDomainOperation: Operation<
  ResolveDomainRequest,
  ResolveDomainJSONRequest,
  ResolveDomainResponse,
  ResolveDomainJSONResponse
> = {
  method: 'GET',
  name: 'resolveDomain',
  id: 'resolveDomain',
  groupName: 'token',
  urlPathPattern: '/resolve/{domain}',
  urlPathParamNames: ['domain',],
  urlSearchParamNames: ['currency',],

  
  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

// Methods



function getRequestUrlParams(request: ResolveDomainRequest, core: Core) {
  return {
    // address: EvmAddress.create(request.address, core).checksum,
    // chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    // functionName: request.functionName,
    // providerUrl: request.providerUrl,
    // subdomain: request.subdomain,
      currency: request.currency?.toString(),
      domain: request.domain?.toString(),
  };
}

function serializeRequest(request: ResolveDomainRequest, core: Core) {
  return {
      currency: request.currency,
      domain: request.domain,
  };
}

function deserializeRequest(
  jsonRequest: ResolveDomainJSONRequest,
  core: Core,
): ResolveDomainRequest {
  return {
      currency: jsonRequest.currency,
      domain: jsonRequest.domain,
  };
}


function deserializeResponse(jsonResponse: ResolveDomainJSONResponse) {
  return jsonResponse;
}