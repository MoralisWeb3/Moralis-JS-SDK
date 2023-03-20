import {
  Core,
  Camelize,
  PaginatedOperation,
  BigNumber,
  PaginatedResponseAdapter,
  maybe,
  toCamelCase,
} from '@moralisweb3/common-core';
import { EvmChain, EvmChainish, EvmAddress, EvmAddressish, Erc20Transfer } from '../../dataTypes';
import { EvmChainResolver } from '../../EvmChainResolver';
import { operations } from '../openapi';

type OperationId = 'getErc20Transfers';

type QueryParams = operations[OperationId]['parameters']['query'];
type RequestParams = QueryParams;

// TODO: remove this overwrite when the swagger is fixxed
// type SuccessResponse = operations[OperationId]['responses']['200']['content']['application/json'];
type SuccessResponse = {
  cursor?: string | undefined;
  result: operations[OperationId]['responses']['200']['content']['application/json'][];
};

// Exports

export interface GetErc20TransfersRequest
  extends Camelize<
    Omit<RequestParams, 'chain' | 'contract_addresses' | 'exclude_contracts' | 'wallet_addresses' | 'exclude_wallets'>
  > {
  chain?: EvmChainish;
  contractAddresses?: EvmAddressish[];
  excludeContracts?: EvmAddressish[];
  walletAddresses?: EvmAddressish[];
  excludeWallets?: EvmAddressish[];
}

export type GetErc20TransfersJSONRequest = ReturnType<typeof serializeRequest>;

export type GetErc20TransfersJSONResponse = SuccessResponse;

export type GetErc20TransfersResponse = ReturnType<typeof deserializeResponse>;

export interface GetErc20TransfersResponseAdapter
  extends PaginatedResponseAdapter<GetErc20TransfersResponse, GetErc20TransfersJSONResponse['result']> {}

/** Get the amount which the spender is allowed to withdraw on behalf of the owner. */
export const getErc20TransfersOperation: PaginatedOperation<
  GetErc20TransfersRequest,
  GetErc20TransfersJSONRequest,
  GetErc20TransfersResponse,
  GetErc20TransfersJSONResponse['result']
> = {
  method: 'GET',
  name: 'getErc20Transfers',
  id: 'getErc20Transfers',
  groupName: 'token',
  urlPathPattern: '/erc20/transfers',
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

function getRequestUrlParams(request: GetErc20TransfersRequest, core: Core) {
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

function deserializeResponse(
  jsonResponse: GetErc20TransfersJSONResponse,
  request: GetErc20TransfersRequest,
  core: Core,
) {
  return (jsonResponse.result ?? []).map((transfer) =>
    Erc20Transfer.create({
      ...toCamelCase(transfer),
      chain: EvmChainResolver.resolve(request.chain, core),
      address: EvmAddress.create(transfer.contract_address, core),
      toAddress: EvmAddress.create(transfer.to_wallet, core),
      fromAddress: EvmAddress.create(transfer.from_wallet, core),
      value: BigNumber.create(transfer.value),
      blockTimestamp: new Date(transfer.block_timestamp),
    }),
  );
}

function serializeRequest(request: GetErc20TransfersRequest, core: Core) {
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

function deserializeRequest(jsonRequest: GetErc20TransfersJSONRequest, core: Core): GetErc20TransfersRequest {
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
