import {
  Core,
  Camelize,
  PaginatedOperation,
  toCamelCase,
  maybe,
  PaginatedResponseAdapter,
  DateInput,
} from '@moralisweb3/common-core';
import { EvmChain, EvmChainish, EvmAddress, EvmAddressish, EvmNftTransfer, EvmNative } from '../../dataTypes';
import { EvmChainResolver } from '../../EvmChainResolver';
import { operations } from '../openapi';

type OperationId = 'getNFTContractTransfers';

type PathParams = operations[OperationId]['parameters']['path'];
type QueryParams = operations[OperationId]['parameters']['query'];
type RequestParams = PathParams & QueryParams;

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface GetNFTContractTransfersRequest
  extends Camelize<Omit<RequestParams, 'chain' | 'address' | 'from_date' | 'to_date'>> {
  chain?: EvmChainish;
  address: EvmAddressish;
  fromDate?: DateInput;
  toDate?: DateInput;
}

export type GetNFTContractTransfersJSONRequest = ReturnType<typeof serializeRequest>;

export type GetNFTContractTransfersJSONResponse = SuccessResponse;

export type GetNFTContractTransfersResponse = ReturnType<typeof deserializeResponse>;

export interface GetNFTContractTransfersResponseAdapter
  extends PaginatedResponseAdapter<GetNFTContractTransfersResponse, GetNFTContractTransfersJSONResponse['result']> {}

/** Get transfers of NFTs for a given contract and other parameters. */
export const getNFTContractTransfersOperation: PaginatedOperation<
  GetNFTContractTransfersRequest,
  GetNFTContractTransfersJSONRequest,
  GetNFTContractTransfersResponse,
  GetNFTContractTransfersJSONResponse['result']
> = {
  method: 'GET',
  name: 'getNFTContractTransfers',
  id: 'getNFTContractTransfers',
  groupName: 'nft',
  urlPathPattern: '/nft/{address}/transfers',
  urlPathParamNames: ['address'],
  urlSearchParamNames: ['chain', 'format', 'limit', 'cursor', 'fromBlock', 'fromDate', 'toBlock', 'toDate'],
  firstPageIndex: 0,
  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

// Methods

function getRequestUrlParams(request: GetNFTContractTransfersRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    address: EvmAddress.create(request.address).lowercase,
    format: request.format,
    limit: maybe(request.limit, String),
    from_block: maybe(request.fromBlock, String),
    from_date: request.fromDate ? new Date(request.fromDate).toISOString() : undefined,
    to_block: maybe(request.toBlock, String),
    to_date: request.toDate ? new Date(request.toDate).toISOString() : undefined,
    cursor: request.cursor,
  };
}

function deserializeResponse(
  jsonResponse: GetNFTContractTransfersJSONResponse,
  request: GetNFTContractTransfersRequest,
  core: Core,
) {
  return (jsonResponse.result ?? []).map((transfer) =>
    EvmNftTransfer.create({
      ...toCamelCase(transfer),
      chain: EvmChainResolver.resolve(request.chain, core),
      tokenAddress: EvmAddress.create(transfer.to_address),
      toAddress: EvmAddress.create(transfer.to_address),
      operator: transfer.operator ? EvmAddress.create(transfer.operator) : null,
      fromAddress: transfer.from_address ? EvmAddress.create(transfer.from_address) : null,
      value: transfer.value ? EvmNative.create(transfer.value, 'wei') : null,
      blockTimestamp: new Date(transfer.block_timestamp),
    }),
  );
}

function serializeRequest(request: GetNFTContractTransfersRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    format: request.format,
    limit: request.limit,
    cursor: request.cursor,
    address: EvmAddress.create(request.address).checksum,
    fromBlock: request.fromBlock,
    toBlock: request.toBlock,
    fromDate: request.fromDate ? new Date(request.fromDate).toISOString() : undefined,
    toDate: request.toDate ? new Date(request.toDate).toISOString() : undefined,
  };
}

function deserializeRequest(jsonRequest: GetNFTContractTransfersJSONRequest): GetNFTContractTransfersRequest {
  return {
    chain: EvmChain.create(jsonRequest.chain),
    format: jsonRequest.format,
    limit: jsonRequest.limit,
    cursor: jsonRequest.cursor,
    address: EvmAddress.create(jsonRequest.address),
    fromBlock: jsonRequest.fromBlock,
    toBlock: jsonRequest.toBlock,
    fromDate: jsonRequest.fromDate ? new Date(jsonRequest.fromDate) : undefined,
    toDate: jsonRequest.toDate ? new Date(jsonRequest.toDate) : undefined,
  };
}
