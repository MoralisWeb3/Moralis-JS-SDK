import { Core, Camelize, PaginatedOperation, toCamelCase, maybe } from '@moralisweb3/common-core';
import { EvmAddress, EvmChain, EvmChainish, EvmNative, EvmNftTransfer } from '../../dataTypes';
import { EvmChainResolver } from '../../EvmChainResolver';
import { operations } from '../openapi';

type OperationId = 'getNFTTransfersByBlock';

type PathParams = operations[OperationId]['parameters']['path'];
type QueryParams = operations[OperationId]['parameters']['query'];
type RequestParams = PathParams & QueryParams;

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export type GetNftTransfersByBlockRequest = Camelize<Omit<RequestParams, 'chain'>> & {
  chain?: EvmChainish;
};

export type GetNftTransfersByBlockJSONRequest = ReturnType<typeof serializeRequest>;

export type GetNftTransfersByBlockJSONResponse = SuccessResponse;

export type GetNftTransfersByBlockResponse = ReturnType<typeof deserializeResponse>;

export const getNftTransfersByBlockOperation: PaginatedOperation<
  GetNftTransfersByBlockRequest,
  GetNftTransfersByBlockJSONRequest,
  GetNftTransfersByBlockResponse,
  GetNftTransfersByBlockJSONResponse['result']
> = {
  method: 'GET',
  name: 'getNFTTransfersByBlock',
  id: 'getNFTTransfersByBlock',
  groupName: 'nft',
  urlPathPattern: '/block/{blockNumberOrHash}/nft/transfers',
  urlPathParamNames: ['blockNumberOrHash'],
  urlSearchParamNames: ['chain', 'subdomain', 'limit', 'cursor'],
  firstPageIndex: 0,

  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

// Methods

function getRequestUrlParams(request: GetNftTransfersByBlockRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    subdomain: request.subdomain,
    limit: maybe(request.limit, String),
    cursor: request.cursor,
    blockNumberOrHash: request.blockNumberOrHash,
  };
}

function deserializeResponse(
  jsonResponse: GetNftTransfersByBlockJSONResponse,
  request: GetNftTransfersByBlockRequest,
  core: Core,
) {
  return (jsonResponse.result ?? []).map((transfer) =>
    EvmNftTransfer.create({
      ...toCamelCase(transfer),
      chain: EvmChainResolver.resolve(request.chain, core),
      tokenAddress: EvmAddress.create(transfer.to_address),
      toAddress: EvmAddress.create(transfer.to_address),
      operator: transfer.operator ? EvmAddress.create(transfer.operator, core) : null,
      fromAddress: transfer.from_address ? EvmAddress.create(transfer.from_address, core) : null,
      value: transfer.value ? EvmNative.create(transfer.value) : null,
      blockTimestamp: new Date(transfer.block_timestamp),
    }),
  );
}

function serializeRequest(request: GetNftTransfersByBlockRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    subdomain: request.subdomain,
    limit: request.limit,
    cursor: request.cursor,
    blockNumberOrHash: request.blockNumberOrHash,
  };
}

function deserializeRequest(jsonRequest: GetNftTransfersByBlockJSONRequest, core: Core): GetNftTransfersByBlockRequest {
  return {
    chain: EvmChain.create(jsonRequest.chain, core),
    subdomain: jsonRequest.subdomain,
    limit: jsonRequest.limit,
    cursor: jsonRequest.cursor,
    blockNumberOrHash: jsonRequest.blockNumberOrHash,
  };
}
