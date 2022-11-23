import { Core, Camelize, Operation, DateInput, ResponseAdapter } from '@moralisweb3/common-core';
import { EvmChain, EvmChainish, EvmAddress, EvmAddressish } from '../../dataTypes';
import { EvmChainResolver } from '../../EvmChainResolver';
import { operations } from '../openapi';

type OperationId = 'getPairReserves';

type PathParams = operations[OperationId]['parameters']['path'];
type QueryParams = operations[OperationId]['parameters']['query'];
type RequestParams = PathParams & QueryParams;

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface GetPairReservesRequest extends Camelize<Omit<RequestParams, 'chain' | 'pair_address' | 'to_date'>> {
  chain?: EvmChainish;
  pairAddress: EvmAddressish;
  toDate?: DateInput;
}

export type GetPairReservesJSONRequest = ReturnType<typeof serializeRequest>;

export type GetPairReservesJSONResponse = SuccessResponse;

export type GetPairReservesResponse = ReturnType<typeof deserializeResponse>;

export interface GetPairReservesResponseAdapter
  extends ResponseAdapter<GetPairReservesResponse, GetPairReservesJSONResponse> {}

/** Get the liquidity reserves for a given pair address. Only Uniswap V2 based exchanges supported at the moment. */
export const getPairReservesOperation: Operation<
  GetPairReservesRequest,
  GetPairReservesJSONRequest,
  GetPairReservesResponse,
  GetPairReservesJSONResponse
> = {
  method: 'GET',
  name: 'getPairReserves',
  id: 'getPairReserves',
  groupName: 'defi',
  urlPathPattern: '/{pairAddress}/reserves',
  urlPathParamNames: ['pairAddress'],
  urlSearchParamNames: ['chain', 'toBlock', 'toDate', 'providerUrl'],

  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

// Methods

function getRequestUrlParams(request: GetPairReservesRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    pairAddress: EvmAddress.create(request.pairAddress, core).lowercase,
    to_block: request.toBlock,
    to_date: request.toDate ? new Date(request.toDate).toISOString() : undefined,
    provider_url: request.providerUrl,
  };
}

function serializeRequest(request: GetPairReservesRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    toBlock: request.toBlock,
    toDate: request.toDate ? new Date(request.toDate).toISOString() : undefined,
    providerUrl: request.providerUrl,
    pairAddress: EvmAddress.create(request.pairAddress, core).lowercase,
  };
}

function deserializeRequest(jsonRequest: GetPairReservesJSONRequest, core: Core): GetPairReservesRequest {
  return {
    chain: EvmChain.create(jsonRequest.chain, core),
    toBlock: jsonRequest.toBlock,
    toDate: jsonRequest.toDate ? new Date(jsonRequest.toDate) : undefined,
    providerUrl: jsonRequest.providerUrl,
    pairAddress: EvmAddress.create(jsonRequest.pairAddress, core),
  };
}

function deserializeResponse(jsonResponse: GetPairReservesJSONResponse) {
  return jsonResponse;
}
