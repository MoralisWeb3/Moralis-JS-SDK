import { createPaginatedEndpointFactory, createPaginatedEndpoint, PaginatedParams } from '@moralisweb3/api-utils';
import { Camelize, toCamelCase } from '@moralisweb3/core';
import { EvmChainish, EvmAddressish, EvmAddress, EvmTransactionLog } from '@moralisweb3/common-evm-utils';
import { operations } from '../../generated/types';
import { EvmChainResolver } from '../EvmChainResolver';

// old name: getLogsByAddress
type operation = 'getContractLogs';

type QueryParams = operations[operation]['parameters']['query'];
type PathParams = operations[operation]['parameters']['path'];
type ApiParams = QueryParams & PathParams;
export interface Params extends Camelize<Omit<ApiParams, 'chain' | 'address'>>, PaginatedParams {
  chain?: EvmChainish;
  address: EvmAddressish;
}

type ApiResult = operations[operation]['responses']['200']['content']['application/json'];

export const getContractLogs = createPaginatedEndpointFactory((core) =>
  createPaginatedEndpoint({
    name: 'getContractLogs',
    urlParams: ['address'],
    getUrl: (params: Params) => `/${params.address}/logs`,
    apiToResult: (data: ApiResult) =>
      (data.result ?? []).map((log) =>
        EvmTransactionLog.create(
          {
            ...toCamelCase(log),
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            topics: [log.topic0, log.topic1!, log.topic2!, log.topic3!],
            blockNumber: Number(log.block_number),
            chain: log.chainId,
          },
          core,
        ),
      ),
    resultToJson: (data) => data.map((log) => log.toJSON()),
    parseParams: (params: Params): ApiParams => ({
      ...params,
      block_number: params.blockNumber,
      from_block: params.fromBlock,
      to_block: params.toBlock,
      from_date: params.fromDate,
      to_date: params.toDate,
      chain: EvmChainResolver.resolve(params.chain, core).apiHex,
      address: EvmAddress.create(params.address, core).lowercase,
    }),
  }),
);
