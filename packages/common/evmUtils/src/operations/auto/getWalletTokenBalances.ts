import { Core, Camelize, Operation } from '@moralisweb3/common-core';
import { EvmChain,EvmChainish,EvmAddress,EvmAddressish,EvmAddress,EvmAddressish, } from '../../dataTypes';
import { EvmChainResolver } from '../../EvmChainResolver';
import { operations } from '../openapi';

type OperationId = 'getWalletTokenBalances';

type PathParams = operations[OperationId]['parameters']['path'];

type QueryParams = operations[OperationId]['parameters']['query'];



type RequestParams = PathParams & QueryParams ;


type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

//RunContractFunctionRequest

// Exports


export interface GetWalletTokenBalancesRequest extends Camelize<Omit<RequestParams,  | 'chain' | 'token_addresses' | 'address'>> {
      chain?: EvmChainish;
      tokenAddresses?: EvmAddressish;
      address: EvmAddressish;
}

export type GetWalletTokenBalancesJSONRequest = ReturnType<typeof serializeRequest>;

export type GetWalletTokenBalancesJSONResponse = SuccessResponse;

export type GetWalletTokenBalancesResponse = ReturnType<typeof deserializeResponse>;

export const GetWalletTokenBalancesOperation: Operation<
  GetWalletTokenBalancesRequest,
  GetWalletTokenBalancesJSONRequest,
  GetWalletTokenBalancesResponse,
  GetWalletTokenBalancesJSONResponse
> = {
  method: 'GET',
  name: 'getWalletTokenBalances',
  id: 'getWalletTokenBalances',
  groupName: 'token',
  urlPathPattern: '/{address}/erc20',
  urlPathParamNames: ['address',],
  urlSearchParamNames: ['chain','subdomain','toBlock','tokenAddresses',],

  
  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

// Methods



function getRequestUrlParams(request: GetWalletTokenBalancesRequest, core: Core) {
  return {
    // address: EvmAddress.create(request.address, core).checksum,
    // chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    // functionName: request.functionName,
    // providerUrl: request.providerUrl,
    // subdomain: request.subdomain,
      chain: request.chain?.toString(),
      subdomain: request.subdomain?.toString(),
      to_block: request.toBlock?.toString(),
      token_addresses: request.tokenAddresses?.toString(),
      address: request.address?.toString(),
  };
}

function serializeRequest(request: GetWalletTokenBalancesRequest, core: Core) {
  return {
      chain: EvmChainResolver.resolve(request.chain, core).apiHex,
      subdomain: request.subdomain,
      toBlock: request.toBlock,
      tokenAddresses: request.token_addresses.toString(),
      address: request.address.toString(),
  };
}

function deserializeRequest(
  jsonRequest: GetWalletTokenBalancesJSONRequest,
  core: Core,
): GetWalletTokenBalancesRequest {
  return {
      chain: EvmChain.create(jsonRequest.chain, core),
      subdomain: jsonRequest.subdomain,
      toBlock: jsonRequest.toBlock,
      tokenAddresses: EvmAddress.create(jsonRequest.tokenAddresses, core),
      address: EvmAddress.create(jsonRequest.address, core),
  };
}


function deserializeResponse(jsonResponse: GetWalletTokenBalancesJSONResponse) {
  return jsonResponse;
}