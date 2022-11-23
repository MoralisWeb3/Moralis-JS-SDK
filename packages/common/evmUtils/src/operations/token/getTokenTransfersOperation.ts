import {
  Core,
  Camelize,
  PaginatedOperation,
  maybe,
  BigNumber,
  toCamelCase,
  DateInput,
  PaginatedResponseAdapter,
} from '@moralisweb3/common-core';
import { EvmChain, EvmChainish, EvmAddress, EvmAddressish, Erc20Transfer } from '../../dataTypes';
import { EvmChainResolver } from '../../EvmChainResolver';
import { operations } from '../openapi';

type OperationId = 'getTokenTransfers';
type PathParams = operations[OperationId]['parameters']['path'];
type QueryParams = operations[OperationId]['parameters']['query'];
type RequestParams = PathParams & QueryParams;
type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface GetTokenTransfersRequest
  extends Camelize<Omit<RequestParams, 'chain' | 'address' | 'from_date' | 'to_date'>> {
  chain?: EvmChainish;
  address: EvmAddressish;
  fromDate?: DateInput;
  toDate?: DateInput;
}

export type GetTokenTransfersJSONRequest = ReturnType<typeof serializeRequest>;

export type GetTokenTransfersJSONResponse = SuccessResponse;

export type GetTokenTransfersResponse = ReturnType<typeof deserializeResponse>;

export interface GetTokenTransfersResponseAdapter
  extends PaginatedResponseAdapter<GetTokenTransfersResponse, GetTokenTransfersJSONResponse['result']> {}

/** Get ERC20 token transactions from a contract ordered by block number in descending order. */
export const getTokenTransfersOperation: PaginatedOperation<
  GetTokenTransfersRequest,
  GetTokenTransfersJSONRequest,
  GetTokenTransfersResponse,
  GetTokenTransfersJSONResponse['result']
> = {
  method: 'GET',
  name: 'getTokenTransfers',
  id: 'getTokenTransfers',
  groupName: 'token',
  urlPathPattern: '/erc20/{address}/transfers',
  urlPathParamNames: ['address'],
  urlSearchParamNames: ['chain', 'subdomain', 'fromBlock', 'toBlock', 'fromDate', 'toDate', 'offset', 'limit'],
  firstPageIndex: 0,

  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

// Methods

function getRequestUrlParams(request: GetTokenTransfersRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    subdomain: request.subdomain,
    from_block: maybe(request.fromBlock, String),
    to_block: maybe(request.toBlock, String),
    from_date: request.fromDate ? new Date(request.fromDate).toISOString() : undefined,
    to_date: request.toDate ? new Date(request.toDate).toISOString() : undefined,
    offset: maybe(request.offset, String),
    limit: maybe(request.limit, String),
    address: EvmAddress.create(request.address, core).lowercase,
  };
}

function deserializeResponse(
  jsonResponse: GetTokenTransfersJSONResponse,
  request: GetTokenTransfersRequest,
  core: Core,
) {
  return (jsonResponse.result ?? []).map((transfer) =>
    Erc20Transfer.create({
      ...toCamelCase(transfer),
      chain: EvmChainResolver.resolve(request.chain, core),
      address: EvmAddress.create(transfer.address, core),
      toAddress: EvmAddress.create(transfer.to_address, core),
      fromAddress: EvmAddress.create(transfer.from_address, core),
      value: BigNumber.create(transfer.value),
      blockTimestamp: new Date(transfer.block_timestamp),
    }),
  );
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
    address: EvmAddress.create(request.address, core).checksum,
  };
}

function deserializeRequest(jsonRequest: GetTokenTransfersJSONRequest, core: Core): GetTokenTransfersRequest {
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
