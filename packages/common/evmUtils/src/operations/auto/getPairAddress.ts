import { Core, Camelize, Operation } from '@moralisweb3/common-core';
import { EvmChain,EvmChainish,EvmAddress,EvmAddressish,EvmAddress,EvmAddressish, } from '../../dataTypes';
import { EvmChainResolver } from '../../EvmChainResolver';
import { operations } from '../openapi';

type OperationId = 'getPairAddress';

type PathParams = operations[OperationId]['parameters']['path'];

type QueryParams = operations[OperationId]['parameters']['query'];



type RequestParams = PathParams & QueryParams ;


type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

//RunContractFunctionRequest

// Exports


export interface GetPairAddressRequest extends Camelize<Omit<RequestParams,  | 'chain' | 'token0_address' | 'token1_address'>> {
      chain?: EvmChainish;
      token0Address: EvmAddressish;
      token1Address: EvmAddressish;
}

export type GetPairAddressJSONRequest = ReturnType<typeof serializeRequest>;

export type GetPairAddressJSONResponse = SuccessResponse;

export type GetPairAddressResponse = ReturnType<typeof deserializeResponse>;

export const GetPairAddressOperation: Operation<
  GetPairAddressRequest,
  GetPairAddressJSONRequest,
  GetPairAddressResponse,
  GetPairAddressJSONResponse
> = {
  method: 'GET',
  name: 'getPairAddress',
  id: 'getPairAddress',
  groupName: 'token',
  urlPathPattern: '/{token0_address}/{token1_address}/pairAddress',
  urlPathParamNames: ['token0Address','token1Address',],
  urlSearchParamNames: ['chain','toBlock','toDate','exchange',],

  
  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

// Methods



function getRequestUrlParams(request: GetPairAddressRequest, core: Core) {
  return {
    // address: EvmAddress.create(request.address, core).checksum,
    // chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    // functionName: request.functionName,
    // providerUrl: request.providerUrl,
    // subdomain: request.subdomain,
      chain: request.chain?.toString(),
      to_block: request.toBlock?.toString(),
      to_date: request.toDate?.toString(),
      exchange: request.exchange?.toString(),
      token0_address: request.token0Address?.toString(),
      token1_address: request.token1Address?.toString(),
  };
}

function serializeRequest(request: GetPairAddressRequest, core: Core) {
  return {
      chain: EvmChainResolver.resolve(request.chain, core).apiHex,
      toBlock: request.toBlock,
      toDate: request.toDate,
      exchange: request.exchange,
      token0Address: request.token0_address.toString(),
      token1Address: request.token1_address.toString(),
  };
}

function deserializeRequest(
  jsonRequest: GetPairAddressJSONRequest,
  core: Core,
): GetPairAddressRequest {
  return {
      chain: EvmChain.create(jsonRequest.chain, core),
      toBlock: jsonRequest.toBlock,
      toDate: jsonRequest.toDate,
      exchange: jsonRequest.exchange,
      token0Address: EvmAddress.create(jsonRequest.token0Address, core),
      token1Address: EvmAddress.create(jsonRequest.token1Address, core),
  };
}


function deserializeResponse(jsonResponse: GetPairAddressJSONResponse) {
  return jsonResponse;
}