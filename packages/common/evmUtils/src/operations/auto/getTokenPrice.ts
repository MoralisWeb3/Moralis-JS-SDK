import { Core, Camelize, Operation } from '@moralisweb3/common-core';
import { EvmChain,EvmChainish,EvmAddress,EvmAddressish, } from '../../dataTypes';
import { EvmChainResolver } from '../../EvmChainResolver';
import { operations } from '../openapi';

type OperationId = 'getTokenPrice';

type PathParams = operations[OperationId]['parameters']['path'];

type QueryParams = operations[OperationId]['parameters']['query'];



type RequestParams = PathParams & QueryParams ;


type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

//RunContractFunctionRequest

// Exports


export interface GetTokenPriceRequest extends Camelize<Omit<RequestParams,  | 'chain' | 'address'>> {
      chain?: EvmChainish;
      address: EvmAddressish;
}

export type GetTokenPriceJSONRequest = ReturnType<typeof serializeRequest>;

export type GetTokenPriceJSONResponse = SuccessResponse;

export type GetTokenPriceResponse = ReturnType<typeof deserializeResponse>;

export const GetTokenPriceOperation: Operation<
  GetTokenPriceRequest,
  GetTokenPriceJSONRequest,
  GetTokenPriceResponse,
  GetTokenPriceJSONResponse
> = {
  method: 'GET',
  name: 'getTokenPrice',
  id: 'getTokenPrice',
  groupName: 'token',
  urlPathPattern: '/erc20/{address}/price',
  urlPathParamNames: ['address',],
  urlSearchParamNames: ['chain','providerUrl','exchange','toBlock',],

  
  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

// Methods



function getRequestUrlParams(request: GetTokenPriceRequest, core: Core) {
  return {
    // address: EvmAddress.create(request.address, core).checksum,
    // chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    // functionName: request.functionName,
    // providerUrl: request.providerUrl,
    // subdomain: request.subdomain,
      chain: request.chain?.toString(),
      providerUrl: request.providerUrl?.toString(),
      exchange: request.exchange?.toString(),
      to_block: request.toBlock?.toString(),
      address: request.address?.toString(),
  };
}

function serializeRequest(request: GetTokenPriceRequest, core: Core) {
  return {
      chain: EvmChainResolver.resolve(request.chain, core).apiHex,
      providerUrl: request.providerUrl,
      exchange: request.exchange,
      toBlock: request.toBlock,
      address: request.address.toString(),
  };
}

function deserializeRequest(
  jsonRequest: GetTokenPriceJSONRequest,
  core: Core,
): GetTokenPriceRequest {
  return {
      chain: EvmChain.create(jsonRequest.chain, core),
      providerUrl: jsonRequest.providerUrl,
      exchange: jsonRequest.exchange,
      toBlock: jsonRequest.toBlock,
      address: EvmAddress.create(jsonRequest.address, core),
  };
}


function deserializeResponse(jsonResponse: GetTokenPriceJSONResponse) {
  return jsonResponse;
}