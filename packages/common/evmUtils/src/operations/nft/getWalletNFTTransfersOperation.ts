import {
  Core,
  Camelize,
  PaginatedOperation,
  maybe,
  toCamelCase,
  PaginatedResponseAdapter,
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

export interface GetWalletNFTTransfersRequest extends Camelize<Omit<RequestParams, 'chain' | 'address'>> {
  chain?: EvmChainish;
  address: EvmAddressish;
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
  urlSearchParamNames: ['chain', 'format', 'direction', 'fromBlock', 'toBlock', 'limit', 'cursor'],
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
    address: EvmAddress.create(request.address, core).lowercase,
    format: request.format,
    direction: request.direction,
    from_block: maybe(request.fromBlock, String),
    to_block: request.toBlock,
    limit: maybe(request.limit, String),
    cursor: request.cursor,
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
      operator: transfer.operator ? EvmAddress.create(transfer.operator, core) : null,
      fromAddress: transfer.from_address ? EvmAddress.create(transfer.from_address, core) : null,
      value: transfer.value ? EvmNative.create(transfer.value) : null,
      blockTimestamp: new Date(transfer.block_timestamp),
    }),
  );
}

function serializeRequest(request: GetWalletNFTTransfersRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    format: request.format,
    direction: request.direction,
    fromBlock: request.fromBlock,
    toBlock: request.toBlock,
    limit: request.limit,
    cursor: request.cursor,
    address: EvmAddress.create(request.address, core).checksum,
  };
}

function deserializeRequest(jsonRequest: GetWalletNFTTransfersJSONRequest, core: Core): GetWalletNFTTransfersRequest {
  return {
    chain: EvmChain.create(jsonRequest.chain, core),
    format: jsonRequest.format,
    direction: jsonRequest.direction,
    fromBlock: jsonRequest.fromBlock,
    toBlock: jsonRequest.toBlock,
    limit: jsonRequest.limit,
    cursor: jsonRequest.cursor,
    address: EvmAddress.create(jsonRequest.address, core),
  };
}
