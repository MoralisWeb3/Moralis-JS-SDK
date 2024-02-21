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
import { EvmChain, EvmChainish, EvmAddress, EvmAddressish, Erc20Transaction } from '../../dataTypes';
import { EvmChainResolver } from '../../EvmChainResolver';
import { operations } from '../openapi';

type OperationId = 'getWalletTokenTransfers';
type PathParams = operations[OperationId]['parameters']['path'];
type QueryParams = operations[OperationId]['parameters']['query'];
type RequestParams = PathParams & QueryParams;
type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface GetWalletTokenTransfersRequest
  extends Camelize<Omit<RequestParams, 'chain' | 'address' | 'from_date' | 'to_date' | 'contract_addresses'>> {
  chain?: EvmChainish;
  address: EvmAddressish;
  fromDate?: DateInput;
  toDate?: DateInput;
  contractAddresses?: EvmAddressish[];
}

export type GetWalletTokenTransfersJSONRequest = ReturnType<typeof serializeRequest>;

export type GetWalletTokenTransfersJSONResponse = SuccessResponse;

export type GetWalletTokenTransfersResponse = ReturnType<typeof deserializeResponse>;

export interface GetWalletTokenTransfersResponseAdapter
  extends PaginatedResponseAdapter<GetWalletTokenTransfersResponse, GetWalletTokenTransfersJSONResponse['result']> {}

/** Get ERC20 token transactions ordered by block number in descending order. */
export const getWalletTokenTransfersOperation: PaginatedOperation<
  GetWalletTokenTransfersRequest,
  GetWalletTokenTransfersJSONRequest,
  GetWalletTokenTransfersResponse,
  GetWalletTokenTransfersJSONResponse['result']
> = {
  method: 'GET',
  name: 'getWalletTokenTransfers',
  id: 'getWalletTokenTransfers',
  groupName: 'token',
  urlPathPattern: '/{address}/erc20/transfers',
  urlPathParamNames: ['address'],
  urlSearchParamNames: [
    'chain',
    'fromBlock',
    'toBlock',
    'fromDate',
    'toDate',
    'limit',
    'cursor',
    'order',
    'contractAddresses',
  ],
  firstPageIndex: 0,

  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

// Methods

function getRequestUrlParams(request: GetWalletTokenTransfersRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    address: EvmAddress.create(request.address).lowercase,
    from_block: maybe(request.fromBlock, String),
    to_block: maybe(request.toBlock, String),
    from_date: request.fromDate ? new Date(request.fromDate).toISOString() : undefined,
    to_date: request.toDate ? new Date(request.toDate).toISOString() : undefined,
    limit: maybe(request.limit, String),
    cursor: request.cursor,
    order: request.order,
    contract_addresses: request.contractAddresses?.map((address) => EvmAddress.create(address).lowercase),
  };
}

function deserializeResponse(
  jsonResponse: GetWalletTokenTransfersJSONResponse,
  request: GetWalletTokenTransfersRequest,
  core: Core,
) {
  return (jsonResponse.result ?? []).map((transfer) =>
    Erc20Transaction.create({
      ...toCamelCase(transfer),
      chain: EvmChainResolver.resolve(request.chain, core),
      address: EvmAddress.create(transfer.address),
      toAddress: EvmAddress.create(transfer.to_address),
      fromAddress: EvmAddress.create(transfer.from_address),
      value: BigNumber.create(transfer.value),
      blockTimestamp: new Date(transfer.block_timestamp),
    }),
  );
}

function serializeRequest(request: GetWalletTokenTransfersRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    address: EvmAddress.create(request.address).checksum,
    fromBlock: request.fromBlock,
    toBlock: request.toBlock,
    fromDate: request.fromDate,
    toDate: request.toDate,
    limit: request.limit,
    cursor: request.cursor,
    order: request.order,
    contractAddresses: request.contractAddresses?.map((address) => EvmAddress.create(address).lowercase),
  };
}

function deserializeRequest(jsonRequest: GetWalletTokenTransfersJSONRequest): GetWalletTokenTransfersRequest {
  return {
    chain: EvmChain.create(jsonRequest.chain),
    address: EvmAddress.create(jsonRequest.address),
    fromBlock: jsonRequest.fromBlock,
    toBlock: jsonRequest.toBlock,
    fromDate: jsonRequest.fromDate,
    toDate: jsonRequest.toDate,
    limit: jsonRequest.limit,
    cursor: jsonRequest.cursor,
    order: jsonRequest.order,
    contractAddresses: jsonRequest.contractAddresses ? jsonRequest.contractAddresses.map(EvmAddress.create) : undefined,
  };
}
