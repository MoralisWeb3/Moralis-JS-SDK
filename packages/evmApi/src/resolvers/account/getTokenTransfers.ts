import { BigNumber, Camelize, toCamelCase } from '@moralisweb3/core';
import { EvmChainish, EvmAddressish, EvmAddress } from '@moralisweb3/evm-utils';
import { operations } from '../../generated/types';
import { ApiPaginatedOptions, ApiPaginatedResolver } from '@moralisweb3/api-utils';
import { BASE_URL } from '../../EvmApi';
import { EvmChainResolver } from '../EvmChainResolver';

type operation = 'getTokenTransfers';

type QueryParams = operations[operation]['parameters']['query'];
type PathParams = operations[operation]['parameters']['path'];
type ApiParams = QueryParams & PathParams;
export interface Params extends Camelize<Omit<ApiParams, 'chain' | 'address'>>, ApiPaginatedOptions {
  chain?: EvmChainish;
  address: EvmAddressish;
}

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export const getTokenTransfersResolver = new ApiPaginatedResolver({
  name: 'getTokenTransfers',
  getUrl: (params: Params) => `${BASE_URL}/${params.address}/erc20/transfers`,
  apiToResult: (data: ApiResult) =>
    data.result?.map((transfer) => ({
      ...toCamelCase(transfer),
      address: EvmAddress.create(transfer.address),
      toAddress: EvmAddress.create(transfer.to_address),
      fromAddress: EvmAddress.create(transfer.from_address),
      value: BigNumber.from(transfer.value),
      blockTimestamp: new Date(transfer.block_timestamp),
    })),
  resultToJson: (data) =>
    data?.map((transfer) => ({
      ...transfer,
      address: transfer.address.format(),
      toAddress: transfer.toAddress.format(),
      fromAddress: transfer.fromAddress.format(),
      value: transfer.value.toString(),
      blockTimestamp: transfer.blockTimestamp.toLocaleString(),
    })),
  parseParams: (params: Params): ApiParams => ({
    ...params,
    chain: EvmChainResolver.resolve(params.chain).apiHex,
    address: EvmAddress.create(params.address).lowercase,
    to_block: params.toBlock,
    from_block: params.fromBlock,
    from_date: params.fromDate,
    to_date: params.toDate,
  }),
});
