import { Core, Camelize, Operation } from '@moralisweb3/common-core';
import { EvmChain,EvmChainish,EvmAddress,EvmAddressish, } from '../../dataTypes';
import { EvmChainResolver } from '../../EvmChainResolver';
import { operations } from '../openapi';

type OperationId = 'getNFTTrades';

type PathParams = operations[OperationId]['parameters']['path'];

type QueryParams = operations[OperationId]['parameters']['query'];



type RequestParams = PathParams & QueryParams ;


type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

//RunContractFunctionRequest

// Exports


export interface GetNftTradesRequest extends Camelize<Omit<RequestParams,  | 'chain' | 'address'>> {
      chain?: EvmChainish;
      address: EvmAddressish;
}

export type GetNftTradesJSONRequest = ReturnType<typeof serializeRequest>;

export type GetNftTradesJSONResponse = SuccessResponse;

export type GetNftTradesResponse = ReturnType<typeof deserializeResponse>;

export const GetNftTradesOperation: Operation<
  GetNftTradesRequest,
  GetNftTradesJSONRequest,
  GetNftTradesResponse,
  GetNftTradesJSONResponse
> = {
  method: 'GET',
  name: 'getNFTTrades',
  id: 'getNFTTrades',
  groupName: 'token',
  urlPathPattern: '/nft/{address}/trades',
  urlPathParamNames: ['address',],
  urlSearchParamNames: ['chain','fromBlock','toBlock','fromDate','toDate','providerUrl','marketplace','cursor','limit',],

  
  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

// Methods



function getRequestUrlParams(request: GetNftTradesRequest, core: Core) {
  return {
    // address: EvmAddress.create(request.address, core).checksum,
    // chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    // functionName: request.functionName,
    // providerUrl: request.providerUrl,
    // subdomain: request.subdomain,
      chain: request.chain?.toString(),
      from_block: request.fromBlock?.toString(),
      to_block: request.toBlock?.toString(),
      from_date: request.fromDate?.toString(),
      to_date: request.toDate?.toString(),
      provider_url: request.providerUrl?.toString(),
      marketplace: request.marketplace?.toString(),
      cursor: request.cursor?.toString(),
      limit: request.limit?.toString(),
      address: request.address?.toString(),
  };
}

function serializeRequest(request: GetNftTradesRequest, core: Core) {
  return {
      chain: EvmChainResolver.resolve(request.chain, core).apiHex,
      fromBlock: request.fromBlock,
      toBlock: request.toBlock,
      fromDate: request.fromDate,
      toDate: request.toDate,
      providerUrl: request.providerUrl,
      marketplace: request.marketplace,
      cursor: request.cursor,
      limit: request.limit,
      address: request.address.toString(),
  };
}

function deserializeRequest(
  jsonRequest: GetNftTradesJSONRequest,
  core: Core,
): GetNftTradesRequest {
  return {
      chain: EvmChain.create(jsonRequest.chain, core),
      fromBlock: jsonRequest.fromBlock,
      toBlock: jsonRequest.toBlock,
      fromDate: jsonRequest.fromDate,
      toDate: jsonRequest.toDate,
      providerUrl: jsonRequest.providerUrl,
      marketplace: jsonRequest.marketplace,
      cursor: jsonRequest.cursor,
      limit: jsonRequest.limit,
      address: EvmAddress.create(jsonRequest.address, core),
  };
}


function deserializeResponse(jsonResponse: GetNftTradesJSONResponse) {
  return jsonResponse;
}