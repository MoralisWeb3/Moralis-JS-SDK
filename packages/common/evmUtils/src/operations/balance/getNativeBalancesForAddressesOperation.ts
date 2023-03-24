import { Core, Camelize, Operation, maybe, ResponseAdapter } from '@moralisweb3/common-core';
import { EvmChainish, EvmAddress, EvmAddressish, EvmNative } from '../../dataTypes';
import { EvmChainResolver } from '../../EvmChainResolver';
import { operations } from '../openapi';

type OperationId = 'getNativeBalancesForAddresses';

type QueryParams = operations[OperationId]['parameters']['query'];
type RequestParams = QueryParams;

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface GetNativeBalancesForAddressesRequest
  extends Camelize<Omit<RequestParams, 'chain' | 'wallet_addresses'>> {
  chain?: EvmChainish;
  walletAddresses: EvmAddressish[];
}

export type GetNativeBalancesForAddressesJSONRequest = ReturnType<typeof serializeRequest>;

export type GetNativeBalancesForAddressesJSONResponse = SuccessResponse;

export type GetNativeBalancesForAddressesResponse = ReturnType<typeof deserializeResponse>;

export interface GetNativeBalancesForAddressesResponseAdapter
  extends ResponseAdapter<GetNativeBalancesForAddressesResponse, GetNativeBalancesForAddressesJSONResponse> {}

/** Get the native balances for a set of specific addresses */
export const getNativeBalancesForAddressesOperation: Operation<
  GetNativeBalancesForAddressesRequest,
  GetNativeBalancesForAddressesJSONRequest,
  GetNativeBalancesForAddressesResponse,
  GetNativeBalancesForAddressesJSONResponse
> = {
  method: 'GET',
  name: 'getNativeBalancesForAddresses',
  id: 'getNativeBalancesForAddresses',
  groupName: 'balance',
  urlPathPattern: '/wallets/balance',
  urlSearchParamNames: ['chain', 'toBlock', 'walletAddresses'],

  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

// Methods

function getRequestUrlParams(request: GetNativeBalancesForAddressesRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    to_block: maybe(request.toBlock, String),
    wallet_addresses: request.walletAddresses?.map((address) => EvmAddress.create(address, core).checksum),
  };
}

function deserializeResponse(
  jsonResponse: GetNativeBalancesForAddressesJSONResponse,
  request: GetNativeBalancesForAddressesRequest,
  core: Core,
) {
  return (jsonResponse ?? []).map((chainBalances) => ({
    chain: EvmChainResolver.resolve(request.chain, core),
    blockNumber: chainBalances.block_number,
    blockTimestamp: chainBalances.block_timestamp,
    totalBalance: EvmNative.create(chainBalances.total_balance, 'wei'),
    walletBalances: chainBalances.wallet_balances.map((walletBalance) => ({
      address: EvmAddress.create(walletBalance.address, core),
      balance: EvmNative.create(walletBalance.balance, 'wei'),
    })),
  }));
}

function serializeRequest(request: GetNativeBalancesForAddressesRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    toBlock: request.toBlock,
    walletAddresses: request.walletAddresses?.map((address) => EvmAddress.create(address, core).checksum),
  };
}

function deserializeRequest(
  jsonRequest: GetNativeBalancesForAddressesJSONRequest,
  core: Core,
): GetNativeBalancesForAddressesRequest {
  return {
    chain: EvmChainResolver.resolve(jsonRequest.chain, core),
    toBlock: jsonRequest.toBlock,
    walletAddresses: jsonRequest.walletAddresses?.map((address) => EvmAddress.create(address, core)),
  };
}
