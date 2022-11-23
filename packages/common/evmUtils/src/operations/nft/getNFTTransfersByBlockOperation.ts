import {
  Core,
  Camelize,
  PaginatedOperation,
  toCamelCase,
  maybe,
  PaginatedResponseAdapter,
} from '@moralisweb3/common-core';
import { EvmAddress, EvmChain, EvmChainish, EvmNative, EvmNftTransfer } from '../../dataTypes';
import { EvmChainResolver } from '../../EvmChainResolver';
import { operations } from '../openapi';

type OperationId = 'getNFTTransfersByBlock';

type PathParams = operations[OperationId]['parameters']['path'];
type QueryParams = operations[OperationId]['parameters']['query'];
type RequestParams = PathParams & QueryParams;

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface GetNFTTransfersByBlockRequest extends Camelize<Omit<RequestParams, 'chain'>> {
  chain?: EvmChainish;
}

export type GetNFTTransfersByBlockJSONRequest = ReturnType<typeof serializeRequest>;

export type GetNFTTransfersByBlockJSONResponse = SuccessResponse;

export type GetNFTTransfersByBlockResponse = ReturnType<typeof deserializeResponse>;

export interface GetNFTTransfersByBlockResponseAdapter
  extends PaginatedResponseAdapter<GetNFTTransfersByBlockResponse, GetNFTTransfersByBlockJSONResponse['result']> {}

/** Get transfers of NFTs given a block number or block hash. */
export const getNFTTransfersByBlockOperation: PaginatedOperation<
  GetNFTTransfersByBlockRequest,
  GetNFTTransfersByBlockJSONRequest,
  GetNFTTransfersByBlockResponse,
  GetNFTTransfersByBlockJSONResponse['result']
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

function getRequestUrlParams(request: GetNFTTransfersByBlockRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    subdomain: request.subdomain,
    limit: maybe(request.limit, String),
    cursor: request.cursor,
    blockNumberOrHash: request.blockNumberOrHash,
  };
}

function deserializeResponse(
  jsonResponse: GetNFTTransfersByBlockJSONResponse,
  request: GetNFTTransfersByBlockRequest,
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

function serializeRequest(request: GetNFTTransfersByBlockRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    subdomain: request.subdomain,
    limit: request.limit,
    cursor: request.cursor,
    blockNumberOrHash: request.blockNumberOrHash,
  };
}

function deserializeRequest(jsonRequest: GetNFTTransfersByBlockJSONRequest, core: Core): GetNFTTransfersByBlockRequest {
  return {
    chain: EvmChain.create(jsonRequest.chain, core),
    subdomain: jsonRequest.subdomain,
    limit: jsonRequest.limit,
    cursor: jsonRequest.cursor,
    blockNumberOrHash: jsonRequest.blockNumberOrHash,
  };
}
