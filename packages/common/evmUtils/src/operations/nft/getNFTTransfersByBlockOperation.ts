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
  urlSearchParamNames: ['chain', 'limit', 'cursor', 'disableTotal'],
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
    limit: maybe(request.limit, String),
    cursor: request.cursor,
    blockNumberOrHash: request.blockNumberOrHash,
    disable_total: request.disableTotal,
  };
}

function deserializeResponse(
  jsonResponse: GetNFTTransfersByBlockJSONResponse,
  request: GetNFTTransfersByBlockRequest,
  core: Core,
) {
  return (jsonResponse.result ?? []).map((transfer) =>
    EvmNftTransfer.create(
      {
        ...toCamelCase(transfer),
        chain: EvmChainResolver.resolve(request.chain, core),
        tokenAddress: EvmAddress.create(transfer.token_address, core),
        toAddress: EvmAddress.create(transfer.to_address, core),
        operator: transfer.operator ? EvmAddress.create(transfer.operator, core) : null,
        fromAddress: transfer.from_address ? EvmAddress.create(transfer.from_address, core) : null,
        value: transfer.value ? EvmNative.create(transfer.value, 'wei') : null,
        blockTimestamp: new Date(transfer.block_timestamp),
      },
      core,
    ),
  );
}

function serializeRequest(request: GetNFTTransfersByBlockRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    limit: request.limit,
    cursor: request.cursor,
    blockNumberOrHash: request.blockNumberOrHash,
    disableTotal: request.disableTotal,
  };
}

function deserializeRequest(jsonRequest: GetNFTTransfersByBlockJSONRequest, core: Core): GetNFTTransfersByBlockRequest {
  return {
    chain: EvmChain.create(jsonRequest.chain, core),
    limit: jsonRequest.limit,
    cursor: jsonRequest.cursor,
    blockNumberOrHash: jsonRequest.blockNumberOrHash,
    disableTotal: jsonRequest.disableTotal,
  };
}
