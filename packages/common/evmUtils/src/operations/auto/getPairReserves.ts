import { Core, Camelize, Operation } from '@moralisweb3/common-core';
import { EvmChain,EvmChainish,EvmAddress,EvmAddressish, } from '../../dataTypes';
import { EvmChainResolver } from '../../EvmChainResolver';
import { operations } from '../openapi';

type OperationId = 'getPairReserves';

type PathParams = operations[OperationId]['parameters']['path'];

type QueryParams = operations[OperationId]['parameters']['query'];



type RequestParams = PathParams & QueryParams ;


type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

//RunContractFunctionRequest

// Exports


export interface GetPairReservesRequest extends Camelize<Omit<RequestParams,  | 'chain' | 'pair_address'>> {
      chain?: EvmChainish;
      pairAddress: EvmAddressish;
}

export type GetPairReservesJSONRequest = ReturnType<typeof serializeRequest>;

export type GetPairReservesJSONResponse = SuccessResponse;

export type GetPairReservesResponse = ReturnType<typeof deserializeResponse>;

export const GetPairReservesOperation: Operation<
  GetPairReservesRequest,
  GetPairReservesJSONRequest,
  GetPairReservesResponse,
  GetPairReservesJSONResponse
> = {
  method: 'GET',
  name: 'getPairReserves',
  id: 'getPairReserves',
  groupName: 'token',
  urlPathPattern: '/{pair_address}/reserves',
  urlPathParamNames: ['pairAddress',],
  urlSearchParamNames: ['chain','toBlock','toDate','providerUrl',],

  
  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

// Methods



function getRequestUrlParams(request: GetPairReservesRequest, core: Core) {
  return {
    // address: EvmAddress.create(request.address, core).checksum,
    // chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    // functionName: request.functionName,
    // providerUrl: request.providerUrl,
    // subdomain: request.subdomain,
      chain: request.chain?.toString(),
      to_block: request.toBlock?.toString(),
      to_date: request.toDate?.toString(),
      provider_url: request.providerUrl?.toString(),
      pair_address: request.pairAddress?.toString(),
  };
}

function serializeRequest(request: GetPairReservesRequest, core: Core) {
  return {
      chain: EvmChainResolver.resolve(request.chain, core).apiHex,
      toBlock: request.toBlock,
      toDate: request.toDate,
      providerUrl: request.providerUrl,
      pairAddress: request.pair_address.toString(),
  };
}

function deserializeRequest(
  jsonRequest: GetPairReservesJSONRequest,
  core: Core,
): GetPairReservesRequest {
  return {
      chain: EvmChain.create(jsonRequest.chain, core),
      toBlock: jsonRequest.toBlock,
      toDate: jsonRequest.toDate,
      providerUrl: jsonRequest.providerUrl,
      pairAddress: EvmAddress.create(jsonRequest.pairAddress, core),
  };
}


function deserializeResponse(jsonResponse: GetPairReservesJSONResponse) {
  return jsonResponse;
}