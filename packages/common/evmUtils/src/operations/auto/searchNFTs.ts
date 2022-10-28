import { Core, Camelize, Operation, maybe } from '@moralisweb3/common-core';
import { EvmChain,EvmChainish,EvmAddress,EvmAddressish, } from '../../dataTypes';
import { EvmChainResolver } from '../../EvmChainResolver';
import { operations } from '../openapi';

type OperationId = 'searchNFTs';



type QueryParams = operations[OperationId]['parameters']['query'];



type RequestParams =  & QueryParams ;


type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface SearchNfTsRequest extends Camelize<Omit<RequestParams,  | 'chain' | 'addresses'>> {
      chain?: EvmChainish;
      addresses?: EvmAddressish;
}

export type SearchNfTsJSONRequest = ReturnType<typeof serializeRequest>;

export type SearchNfTsJSONResponse = SuccessResponse;

export type SearchNfTsResponse = ReturnType<typeof deserializeResponse>;

export const SearchNfTsOperation: Operation<
  SearchNfTsRequest,
  SearchNfTsJSONRequest,
  SearchNfTsResponse,
  SearchNfTsJSONResponse
> = {
  method: 'GET',
  name: 'searchNFTs',
  id: 'searchNFTs',
  groupName: 'token',
  urlPathPattern: '/nft/search',
  
  urlSearchParamNames: ['chain','format','q','filter','fromBlock','toBlock','fromDate','toDate','addresses','cursor','limit',],

  
  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

// Methods



function getRequestUrlParams(request: SearchNfTsRequest, core: Core) {
  return {
      chain: EvmChainResolver.resolve(request.chain, core).apiHex,
      format: request.format,
      q: request.q,
      filter: request.filter,
      from_block: maybe(request.fromBlock, String),
      to_block: maybe(request.toBlock, String),
      from_date: request.fromDate,
      to_date: request.toDate,
      addresses: EvmAddress.create(request.addresses, core).lowercase,
      cursor: request.cursor,
      limit: maybe(request.limit, String),
  };
}

function serializeRequest(request: SearchNfTsRequest, core: Core) {
  return {
      chain: EvmChainResolver.resolve(request.chain, core).apiHex,
      format: request.format,
      q: request.q,
      filter: request.filter,
      fromBlock: request.fromBlock,
      toBlock: request.toBlock,
      fromDate: request.fromDate,
      toDate: request.toDate,
      addresses: request.addresses.toString(),
      cursor: request.cursor,
      limit: request.limit,
  };
}

function deserializeRequest(
  jsonRequest: SearchNfTsJSONRequest,
  core: Core,
): SearchNfTsRequest {
  return {
      chain: EvmChain.create(jsonRequest.chain, core),
      format: jsonRequest.format,
      q: jsonRequest.q,
      filter: jsonRequest.filter,
      fromBlock: jsonRequest.fromBlock,
      toBlock: jsonRequest.toBlock,
      fromDate: jsonRequest.fromDate,
      toDate: jsonRequest.toDate,
      addresses: EvmAddress.create(jsonRequest.addresses, core),
      cursor: jsonRequest.cursor,
      limit: jsonRequest.limit,
  };
}

function deserializeResponse(jsonResponse: SearchNfTsJSONResponse, request: SearchNfTsRequest, core: Core) {
   return jsonResponse;
}
