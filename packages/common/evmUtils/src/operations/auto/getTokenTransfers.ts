import { Core, Camelize, Operation } from '@moralisweb3/common-core';
import { EvmChain,EvmChainish,EvmAddress,EvmAddressish, } from '../../dataTypes';
import { EvmChainResolver } from '../../EvmChainResolver';
import { operations } from '../openapi';

type OperationId = 'getTokenTransfers';

type PathParams = operations[OperationId]['parameters']['path'];

type QueryParams = operations[OperationId]['parameters']['query'];



type RequestParams = PathParams & QueryParams ;


type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

//RunContractFunctionRequest

// Exports


export interface GetTokenTransfersRequest extends Camelize<Omit<RequestParams,  | 'chain' | 'address'>> {
      chain?: EvmChainish;
      address: EvmAddressish;
}

export type GetTokenTransfersJSONRequest = ReturnType<typeof serializeRequest>;

export type GetTokenTransfersJSONResponse = SuccessResponse;

export type GetTokenTransfersResponse = ReturnType<typeof deserializeResponse>;

export const GetTokenTransfersOperation: Operation<
  GetTokenTransfersRequest,
  GetTokenTransfersJSONRequest,
  GetTokenTransfersResponse,
  GetTokenTransfersJSONResponse
> = {
  method: 'GET',
  name: 'getTokenTransfers',
  id: 'getTokenTransfers',
  groupName: 'token',
  urlPathPattern: '/erc20/{address}/transfers',
  urlPathParamNames: ['address',],
  urlSearchParamNames: ['chain','subdomain','fromBlock','toBlock','fromDate','toDate','offset','limit',],

  
  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

// Methods



function getRequestUrlParams(request: GetTokenTransfersRequest, core: Core) {
  return {
    // address: EvmAddress.create(request.address, core).checksum,
    // chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    // functionName: request.functionName,
    // providerUrl: request.providerUrl,
    // subdomain: request.subdomain,
      chain: request.chain?.toString(),
      subdomain: request.subdomain?.toString(),
      from_block: request.fromBlock?.toString(),
      to_block: request.toBlock?.toString(),
      from_date: request.fromDate?.toString(),
      to_date: request.toDate?.toString(),
      offset: request.offset?.toString(),
      limit: request.limit?.toString(),
      address: request.address?.toString(),
  };
}

function serializeRequest(request: GetTokenTransfersRequest, core: Core) {
  return {
      chain: EvmChainResolver.resolve(request.chain, core).apiHex,
      subdomain: request.subdomain,
      fromBlock: request.fromBlock,
      toBlock: request.toBlock,
      fromDate: request.fromDate,
      toDate: request.toDate,
      offset: request.offset,
      limit: request.limit,
      address: request.address.toString(),
  };
}

function deserializeRequest(
  jsonRequest: GetTokenTransfersJSONRequest,
  core: Core,
): GetTokenTransfersRequest {
  return {
      chain: EvmChain.create(jsonRequest.chain, core),
      subdomain: jsonRequest.subdomain,
      fromBlock: jsonRequest.fromBlock,
      toBlock: jsonRequest.toBlock,
      fromDate: jsonRequest.fromDate,
      toDate: jsonRequest.toDate,
      offset: jsonRequest.offset,
      limit: jsonRequest.limit,
      address: EvmAddress.create(jsonRequest.address, core),
  };
}


function deserializeResponse(jsonResponse: GetTokenTransfersJSONResponse) {
  return jsonResponse;
}