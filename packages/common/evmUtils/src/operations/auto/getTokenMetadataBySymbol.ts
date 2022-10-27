import { Core, Camelize, Operation } from '@moralisweb3/common-core';
import { EvmChain,EvmChainish, } from '../../dataTypes';
import { EvmChainResolver } from '../../EvmChainResolver';
import { operations } from '../openapi';

type OperationId = 'getTokenMetadataBySymbol';



type QueryParams = operations[OperationId]['parameters']['query'];



type RequestParams =  & QueryParams ;


type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

//RunContractFunctionRequest

// Exports


export interface GetTokenMetadataBySymbolRequest extends Camelize<Omit<RequestParams,  | 'chain'>> {
      chain?: EvmChainish;
}

export type GetTokenMetadataBySymbolJSONRequest = ReturnType<typeof serializeRequest>;

export type GetTokenMetadataBySymbolJSONResponse = SuccessResponse;

export type GetTokenMetadataBySymbolResponse = ReturnType<typeof deserializeResponse>;

export const GetTokenMetadataBySymbolOperation: Operation<
  GetTokenMetadataBySymbolRequest,
  GetTokenMetadataBySymbolJSONRequest,
  GetTokenMetadataBySymbolResponse,
  GetTokenMetadataBySymbolJSONResponse
> = {
  method: 'GET',
  name: 'getTokenMetadataBySymbol',
  id: 'getTokenMetadataBySymbol',
  groupName: 'token',
  urlPathPattern: '/erc20/metadata/symbols',
  
  urlSearchParamNames: ['chain','subdomain','symbols',],

  
  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

// Methods



function getRequestUrlParams(request: GetTokenMetadataBySymbolRequest, core: Core) {
  return {
    // address: EvmAddress.create(request.address, core).checksum,
    // chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    // functionName: request.functionName,
    // providerUrl: request.providerUrl,
    // subdomain: request.subdomain,
      chain: request.chain?.toString(),
      subdomain: request.subdomain?.toString(),
      symbols: request.symbols?.toString(),
  };
}

function serializeRequest(request: GetTokenMetadataBySymbolRequest, core: Core) {
  return {
      chain: EvmChainResolver.resolve(request.chain, core).apiHex,
      subdomain: request.subdomain,
      symbols: request.symbols,
  };
}

function deserializeRequest(
  jsonRequest: GetTokenMetadataBySymbolJSONRequest,
  core: Core,
): GetTokenMetadataBySymbolRequest {
  return {
      chain: EvmChain.create(jsonRequest.chain, core),
      subdomain: jsonRequest.subdomain,
      symbols: jsonRequest.symbols,
  };
}


function deserializeResponse(jsonResponse: GetTokenMetadataBySymbolJSONResponse) {
  return jsonResponse;
}