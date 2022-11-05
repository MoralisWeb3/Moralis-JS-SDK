import { Core, Camelize, PaginatedOperation, maybe, toCamelCase } from '@moralisweb3/common-core';
import { EvmChain, EvmChainish, EvmAddress, EvmAddressish, EvmNftTransfer, EvmNative } from '../../dataTypes';
import { EvmChainResolver } from '../../EvmChainResolver';
import { operations } from '../openapi';

type OperationId = 'getNFTTransfers';

type PathParams = operations[OperationId]['parameters']['path'];
type QueryParams = operations[OperationId]['parameters']['query'];
type RequestParams = PathParams & QueryParams;

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export type GetNftTransfersRequest = Camelize<Omit<RequestParams, 'chain' | 'address'>> & {
  chain?: EvmChainish;
  address: EvmAddressish;
};

export type GetNftTransfersJSONRequest = ReturnType<typeof serializeRequest>;

export type GetNftTransfersJSONResponse = SuccessResponse;

export type GetNftTransfersResponse = ReturnType<typeof deserializeResponse>;

export const getNftTransfersOperation: PaginatedOperation<
  GetNftTransfersRequest,
  GetNftTransfersJSONRequest,
  GetNftTransfersResponse,
  GetNftTransfersJSONResponse['result']
> = {
  method: 'GET',
  name: 'getNFTTransfers',
  id: 'getNFTTransfers',
  groupName: 'nft',
  urlPathPattern: '/nft/{address}/{token_id}/transfers',
  urlPathParamNames: ['address', 'tokenId'],
  urlSearchParamNames: ['chain', 'format', 'limit', 'order', 'cursor'],
  firstPageIndex: 0,

  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

// Methods

function getRequestUrlParams(request: GetNftTransfersRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    address: EvmAddress.create(request.address, core).lowercase,
    format: request.format,
    limit: maybe(request.limit, String),
    order: request.order,
    cursor: request.cursor,
    tokenId: request.tokenId,
  };
}

function deserializeResponse(jsonResponse: GetNftTransfersJSONResponse, request: GetNftTransfersRequest, core: Core) {
  return (jsonResponse.result ?? []).map((transfer) =>
    EvmNftTransfer.create({
      ...toCamelCase(transfer),
      chain: EvmChainResolver.resolve(request.chain, core),
      tokenAddress: EvmAddress.create(transfer.to_address, core),
      toAddress: EvmAddress.create(transfer.to_address, core),
      operator: transfer.operator ? EvmAddress.create(transfer.operator, core) : null,
      fromAddress: transfer.from_address ? EvmAddress.create(transfer.from_address, core) : null,
      value: transfer.value ? EvmNative.create(transfer.value) : null,
      blockTimestamp: new Date(transfer.block_timestamp),
    }),
  );
}

function serializeRequest(request: GetNftTransfersRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    format: request.format,
    limit: request.limit,
    order: request.order,
    cursor: request.cursor,
    address: EvmAddress.create(request.address, core).checksum,
    tokenId: request.tokenId,
  };
}

function deserializeRequest(jsonRequest: GetNftTransfersJSONRequest, core: Core): GetNftTransfersRequest {
  return {
    chain: EvmChain.create(jsonRequest.chain, core),
    format: jsonRequest.format,
    limit: jsonRequest.limit,
    order: jsonRequest.order,
    cursor: jsonRequest.cursor,
    address: EvmAddress.create(jsonRequest.address, core),
    tokenId: jsonRequest.tokenId,
  };
}
