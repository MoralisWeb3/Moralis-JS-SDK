import {
  Core,
  Camelize,
  PaginatedOperation,
  maybe,
  toCamelCase,
  PaginatedResponseAdapter,
  DateInput,
} from '@moralisweb3/common-core';
import { EvmChain, EvmChainish, EvmAddress, EvmAddressish, EvmNative, EvmNftTransfer } from '../../dataTypes';
import { EvmChainResolver } from '../../EvmChainResolver';
import { operations } from '../openapi';

type OperationId = 'getWalletNFTTransfers';

type PathParams = operations[OperationId]['parameters']['path'];

type QueryParams = operations[OperationId]['parameters']['query'];

type RequestParams = PathParams & QueryParams;

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface GetWalletNFTTransfersRequest
  extends Camelize<Omit<RequestParams, 'chain' | 'address' | 'from_date' | 'to_date'>> {
  chain?: EvmChainish;
  address: EvmAddressish;
  fromDate?: DateInput;
  toDate?: DateInput;
}

export type GetWalletNFTTransfersJSONRequest = ReturnType<typeof serializeRequest>;

export type GetWalletNFTTransfersJSONResponse = SuccessResponse;

export type GetWalletNFTTransfersResponse = ReturnType<typeof deserializeResponse>;

export interface GetWalletNFTTransfersResponseAdapter
  extends PaginatedResponseAdapter<GetWalletNFTTransfersResponse, GetWalletNFTTransfersJSONResponse['result']> {}

/** Get transfers of NFTs given the wallet and other parameters. */
export const getWalletNFTTransfersOperation: PaginatedOperation<
  GetWalletNFTTransfersRequest,
  GetWalletNFTTransfersJSONRequest,
  GetWalletNFTTransfersResponse,
  GetWalletNFTTransfersJSONResponse['result']
> = {
  method: 'GET',
  name: 'getWalletNFTTransfers',
  id: 'getWalletNFTTransfers',
  groupName: 'nft',
  urlPathPattern: '/{address}/nft/transfers',
  urlPathParamNames: ['address'],
  urlSearchParamNames: ['chain', 'format', 'fromBlock', 'toBlock', 'limit', 'cursor', 'fromDate', 'toDate'],
  firstPageIndex: 0,

  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

// Methods

function getRequestUrlParams(request: GetWalletNFTTransfersRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    address: EvmAddress.create(request.address).lowercase,
    format: request.format,
    from_block: maybe(request.fromBlock, String),
    to_block: request.toBlock,
    limit: maybe(request.limit, String),
    cursor: request.cursor,
    from_date: maybe(request.fromDate, (date) => new Date(date).toISOString()),
    to_date: maybe(request.toDate, (date) => new Date(date).toISOString()),
  };
}

function deserializeResponse(
  jsonResponse: GetWalletNFTTransfersJSONResponse,
  request: GetWalletNFTTransfersRequest,
  core: Core,
) {
  return (jsonResponse.result ?? []).map((transfer) =>
    EvmNftTransfer.create({
      ...toCamelCase(transfer),
      chain: EvmChainResolver.resolve(request.chain, core),
      tokenAddress: EvmAddress.create(transfer.token_address),
      toAddress: EvmAddress.create(transfer.to_address),
      operator: transfer.operator ? EvmAddress.create(transfer.operator) : null,
      fromAddress: transfer.from_address ? EvmAddress.create(transfer.from_address) : null,
      value: transfer.value ? EvmNative.create(transfer.value, 'wei') : null,
      blockTimestamp: new Date(transfer.block_timestamp),
    }),
  );
}

function serializeRequest(request: GetWalletNFTTransfersRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    format: request.format,
    fromBlock: request.fromBlock,
    toBlock: request.toBlock,
    limit: request.limit,
    cursor: request.cursor,
    address: EvmAddress.create(request.address).checksum,
    fromDate: maybe(request.fromDate, (date) => new Date(date).toISOString()),
    toDate: maybe(request.toDate, (date) => new Date(date).toISOString()),
  };
}

function deserializeRequest(jsonRequest: GetWalletNFTTransfersJSONRequest): GetWalletNFTTransfersRequest {
  return {
    chain: EvmChain.create(jsonRequest.chain),
    format: jsonRequest.format,
    fromBlock: jsonRequest.fromBlock,
    toBlock: jsonRequest.toBlock,
    limit: jsonRequest.limit,
    cursor: jsonRequest.cursor,
    address: EvmAddress.create(jsonRequest.address),
    fromDate: jsonRequest.fromDate,
    toDate: jsonRequest.toDate,
  };
}
