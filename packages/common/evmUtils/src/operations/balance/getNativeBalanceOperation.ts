import { Core, Camelize, Operation, maybe, ResponseAdapter } from '@moralisweb3/common-core';
import { EvmChain, EvmChainish, EvmAddress, EvmAddressish, EvmNative } from '../../dataTypes';
import { EvmChainResolver } from '../../EvmChainResolver';
import { operations } from '../openapi';

type OperationId = 'getNativeBalance';

type PathParams = operations[OperationId]['parameters']['path'];
type QueryParams = operations[OperationId]['parameters']['query'];
type RequestParams = PathParams & QueryParams;

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface GetNativeBalanceRequest extends Camelize<Omit<RequestParams, 'chain' | 'address'>> {
  chain?: EvmChainish;
  address: EvmAddressish;
}

export type GetNativeBalanceJSONRequest = ReturnType<typeof serializeRequest>;

export type GetNativeBalanceJSONResponse = SuccessResponse;

export type GetNativeBalanceResponse = ReturnType<typeof deserializeResponse>;

export interface GetNativeBalanceResponseAdapter
  extends ResponseAdapter<GetNativeBalanceResponse, GetNativeBalanceJSONResponse> {}

/** Get the native balance for a specific wallet address. */
export const getNativeBalanceOperation: Operation<
  GetNativeBalanceRequest,
  GetNativeBalanceJSONRequest,
  GetNativeBalanceResponse,
  GetNativeBalanceJSONResponse
> = {
  method: 'GET',
  name: 'getNativeBalance',
  id: 'getNativeBalance',
  groupName: 'balance',
  urlPathPattern: '/{address}/balance',
  urlPathParamNames: ['address'],
  urlSearchParamNames: ['chain', 'providerUrl', 'toBlock'],

  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

// Methods

function getRequestUrlParams(request: GetNativeBalanceRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    providerUrl: request.providerUrl,
    to_block: maybe(request.toBlock, String),
    address: EvmAddress.create(request.address, core).checksum,
  };
}

function deserializeResponse(jsonResponse: GetNativeBalanceJSONResponse) {
  return {
    balance: EvmNative.create(jsonResponse.balance, 'wei'),
  };
}

function serializeRequest(request: GetNativeBalanceRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    providerUrl: request.providerUrl,
    toBlock: request.toBlock,
    address: EvmAddress.create(request.address, core).lowercase,
  };
}

function deserializeRequest(jsonRequest: GetNativeBalanceJSONRequest, core: Core): GetNativeBalanceRequest {
  return {
    chain: EvmChain.create(jsonRequest.chain, core),
    providerUrl: jsonRequest.providerUrl,
    toBlock: jsonRequest.toBlock,
    address: EvmAddress.create(jsonRequest.address, core),
  };
}
