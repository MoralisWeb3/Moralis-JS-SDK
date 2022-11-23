import {
  Core,
  Camelize,
  PaginatedOperation,
  maybe,
  toCamelCase,
  PaginatedResponseAdapter,
} from '@moralisweb3/common-core';
import { EvmChain, EvmChainish, EvmAddress, EvmAddressish, EvmNftTransfer, EvmNative } from '../../dataTypes';
import { EvmChainResolver } from '../../EvmChainResolver';
import { operations } from '../openapi';

type OperationId = 'getNFTTransfers';

type PathParams = operations[OperationId]['parameters']['path'];
type QueryParams = operations[OperationId]['parameters']['query'];
type RequestParams = PathParams & QueryParams;

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface GetNFTTransfersRequest extends Camelize<Omit<RequestParams, 'chain' | 'address'>> {
  chain?: EvmChainish;
  address: EvmAddressish;
}

export type GetNFTTransfersJSONRequest = ReturnType<typeof serializeRequest>;

export type GetNFTTransfersJSONResponse = SuccessResponse;

export type GetNFTTransfersResponse = ReturnType<typeof deserializeResponse>;

export interface GetNFTTransfersResponseAdapter
  extends PaginatedResponseAdapter<GetNFTTransfersResponse, GetNFTTransfersJSONResponse['result']> {}

/** Get transfers of an NFT given a contract address and token ID. */
export const getNFTTransfersOperation: PaginatedOperation<
  GetNFTTransfersRequest,
  GetNFTTransfersJSONRequest,
  GetNFTTransfersResponse,
  GetNFTTransfersJSONResponse['result']
> = {
  method: 'GET',
  name: 'getNFTTransfers',
  id: 'getNFTTransfers',
  groupName: 'nft',
  urlPathPattern: '/nft/{address}/{tokenId}/transfers',
  urlPathParamNames: ['address', 'tokenId'],
  urlSearchParamNames: ['chain', 'format', 'limit', 'cursor'],
  firstPageIndex: 0,

  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

// Methods

function getRequestUrlParams(request: GetNFTTransfersRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    address: EvmAddress.create(request.address, core).lowercase,
    format: request.format,
    limit: maybe(request.limit, String),
    cursor: request.cursor,
    tokenId: request.tokenId,
  };
}

function deserializeResponse(jsonResponse: GetNFTTransfersJSONResponse, request: GetNFTTransfersRequest, core: Core) {
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

function serializeRequest(request: GetNFTTransfersRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    format: request.format,
    limit: request.limit,
    cursor: request.cursor,
    address: EvmAddress.create(request.address, core).checksum,
    tokenId: request.tokenId,
  };
}

function deserializeRequest(jsonRequest: GetNFTTransfersJSONRequest, core: Core): GetNFTTransfersRequest {
  return {
    chain: EvmChain.create(jsonRequest.chain, core),
    format: jsonRequest.format,
    limit: jsonRequest.limit,
    cursor: jsonRequest.cursor,
    address: EvmAddress.create(jsonRequest.address, core),
    tokenId: jsonRequest.tokenId,
  };
}
