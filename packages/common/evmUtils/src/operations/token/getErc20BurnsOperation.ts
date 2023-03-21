import {
  Core,
  Camelize,
  PaginatedOperation,
  PaginatedResponseAdapter,
  maybe,
  toCamelCase,
} from '@moralisweb3/common-core';
import { EvmChain, EvmChainish, EvmAddress, EvmAddressish } from '../../dataTypes';
import { Erc20Burn } from '../../dataTypes/Erc20Burn';
import { EvmChainResolver } from '../../EvmChainResolver';
import { operations } from '../openapi';

type OperationId = 'getErc20Burns';

type QueryParams = operations[OperationId]['parameters']['query'];
type RequestParams = QueryParams;

type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];

// Exports

export interface GetErc20BurnsRequest
  extends Camelize<
    Omit<RequestParams, 'chain' | 'contract_addresses' | 'exclude_contracts' | 'wallet_addresses' | 'exclude_wallets'>
  > {
  chain?: EvmChainish;
  contractAddresses?: EvmAddressish[];
  excludeContracts?: EvmAddressish[];
  walletAddresses?: EvmAddressish[];
  excludeWallets?: EvmAddressish[];
}

export type GetErc20BurnsJSONRequest = ReturnType<typeof serializeRequest>;

export type GetErc20BurnsJSONResponse = SuccessResponse;

export type GetErc20BurnsResponse = ReturnType<typeof deserializeResponse>;

export interface GetErc20BurnsResponseAdapter
  extends PaginatedResponseAdapter<GetErc20BurnsResponse, GetErc20BurnsJSONResponse['result']> {}

/** Get the amount which the spender is allowed to withdraw on behalf of the owner. */
export const getErc20BurnsOperation: PaginatedOperation<
  GetErc20BurnsRequest,
  GetErc20BurnsJSONRequest,
  GetErc20BurnsResponse,
  GetErc20BurnsJSONResponse['result']
> = {
  method: 'GET',
  name: 'getErc20Burns',
  id: 'getErc20Burns',
  groupName: 'token',
  urlPathPattern: '/erc20/burns',
  urlSearchParamNames: [
    'chain',
    'fromBlock',
    'toBlock',
    'limit',
    'cursor',
    'contractAddresses',
    'excludeContracts',
    'walletAddresses',
    'excludeWallets',
  ],
  firstPageIndex: 0,

  getRequestUrlParams,
  serializeRequest,
  deserializeRequest,
  deserializeResponse,
};

// Methods

function getRequestUrlParams(request: GetErc20BurnsRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    from_block: maybe(request.fromBlock, String),
    to_block: maybe(request.toBlock, String),
    limit: maybe(request.limit, String),
    cursor: request.cursor,

    contract_addresses: request.contractAddresses?.map((address) => EvmAddress.create(address, core).lowercase),
    exclude_contracts: request.excludeContracts?.map((address) => EvmAddress.create(address, core).lowercase),
    wallet_addresses: request.walletAddresses?.map((address) => EvmAddress.create(address, core).lowercase),
    exclude_wallets: request.excludeWallets?.map((address) => EvmAddress.create(address, core).lowercase),
  };
}

function deserializeResponse(jsonResponse: GetErc20BurnsJSONResponse, request: GetErc20BurnsRequest, core: Core) {
  return (jsonResponse.result ?? []).map((burn) =>
    Erc20Burn.create(
      {
        ...toCamelCase(burn),
        chain: EvmChainResolver.resolve(request.chain, core),
      },
      core,
    ),
  );
}

function serializeRequest(request: GetErc20BurnsRequest, core: Core) {
  return {
    chain: EvmChainResolver.resolve(request.chain, core).apiHex,
    limit: request.limit,
    cursor: request.cursor,
    fromBlock: request.fromBlock,
    toBlock: request.toBlock,

    contractAddresses: request.contractAddresses?.map((address) => EvmAddress.create(address, core).lowercase),
    excludeContracts: request.excludeContracts?.map((address) => EvmAddress.create(address, core).lowercase),
    walletAddresses: request.walletAddresses?.map((address) => EvmAddress.create(address, core).lowercase),
    excludeWallets: request.excludeWallets?.map((address) => EvmAddress.create(address, core).lowercase),
  };
}

function deserializeRequest(jsonRequest: GetErc20BurnsJSONRequest, core: Core): GetErc20BurnsRequest {
  return {
    chain: EvmChain.create(jsonRequest.chain, core),
    limit: jsonRequest.limit,
    cursor: jsonRequest.cursor,
    fromBlock: jsonRequest.fromBlock,
    toBlock: jsonRequest.toBlock,

    contractAddresses: jsonRequest.contractAddresses?.map((address) => EvmAddress.create(address, core)),
    excludeContracts: jsonRequest.excludeContracts?.map((address) => EvmAddress.create(address, core)),
    walletAddresses: jsonRequest.walletAddresses?.map((address) => EvmAddress.create(address, core)),
    excludeWallets: jsonRequest.excludeWallets?.map((address) => EvmAddress.create(address, core)),
  };
}
