import { Core, Camelize, Operation } from '@moralisweb3/common-core';
import { EvmChain,EvmChainish,EvmAddress,EvmAddressish, } from '../../dataTypes';
import { EvmChainResolver } from '../../EvmChainResolver';
import { operations } from '../openapi';

type OperationId = 'getContractLogs';

type PathParams = operations[OperationId]['parameters']['path'];

type QueryParams = operations[OperationId]['parameters']['query'];



type RequestParams = PathParams & QueryParams ;


type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

//RunContractFunctionRequest

// Exports


export interface GetContractLogsRequest extends Camelize<Omit<RequestParams,  | 'chain' | 'address'>> {
      chain?: EvmChainish;
      address: EvmAddressish;
}

export type GetContractLogsJSONRequest = ReturnType<typeof serializeRequest>;

export type GetContractLogsJSONResponse = SuccessResponse;

export type GetContractLogsResponse = ReturnType<typeof deserializeResponse>;

export const GetContractLogsOperation: Operation<
  GetContractLogsRequest,
  GetContractLogsJSONRequest,
  GetContractLogsResponse,
  GetContractLogsJSONResponse
> = {
  method: 'GET',
  name: 'getContractLogs',
  id: 'getContractLogs',
  groupName: 'token',
  urlPathPattern: '/{address}/logs',
  urlPathParamNames: ['address',],
  urlSearchParamNames: ['chain','subdomain','blockNumber','fromBlock','toBlock','fromDate','toDate','topic0','topic1','topic2','topic3','limit','cursor',],

  
  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

// Methods



function getRequestUrlParams(request: GetContractLogsRequest, core: Core) {
  return {
    // address: EvmAddress.create(request.address, core).checksum,
    // chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    // functionName: request.functionName,
    // providerUrl: request.providerUrl,
    // subdomain: request.subdomain,
      chain: request.chain?.toString(),
      subdomain: request.subdomain?.toString(),
      block_number: request.blockNumber?.toString(),
      from_block: request.fromBlock?.toString(),
      to_block: request.toBlock?.toString(),
      from_date: request.fromDate?.toString(),
      to_date: request.toDate?.toString(),
      topic0: request.topic0?.toString(),
      topic1: request.topic1?.toString(),
      topic2: request.topic2?.toString(),
      topic3: request.topic3?.toString(),
      limit: request.limit?.toString(),
      cursor: request.cursor?.toString(),
      address: request.address?.toString(),
  };
}

function serializeRequest(request: GetContractLogsRequest, core: Core) {
  return {
      chain: EvmChainResolver.resolve(request.chain, core).apiHex,
      subdomain: request.subdomain,
      blockNumber: request.blockNumber,
      fromBlock: request.fromBlock,
      toBlock: request.toBlock,
      fromDate: request.fromDate,
      toDate: request.toDate,
      topic0: request.topic0,
      topic1: request.topic1,
      topic2: request.topic2,
      topic3: request.topic3,
      limit: request.limit,
      cursor: request.cursor,
      address: request.address.toString(),
  };
}

function deserializeRequest(
  jsonRequest: GetContractLogsJSONRequest,
  core: Core,
): GetContractLogsRequest {
  return {
      chain: EvmChain.create(jsonRequest.chain, core),
      subdomain: jsonRequest.subdomain,
      blockNumber: jsonRequest.blockNumber,
      fromBlock: jsonRequest.fromBlock,
      toBlock: jsonRequest.toBlock,
      fromDate: jsonRequest.fromDate,
      toDate: jsonRequest.toDate,
      topic0: jsonRequest.topic0,
      topic1: jsonRequest.topic1,
      topic2: jsonRequest.topic2,
      topic3: jsonRequest.topic3,
      limit: jsonRequest.limit,
      cursor: jsonRequest.cursor,
      address: EvmAddress.create(jsonRequest.address, core),
  };
}


function deserializeResponse(jsonResponse: GetContractLogsJSONResponse) {
  return jsonResponse;
}