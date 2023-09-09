import Moralis from 'moralis';
import { GetContractLogsRequest, GetContractLogsResponse, getContractLogsOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { usePaginatedOperationResolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseEvmContractLogsParams = Partial<GetContractLogsRequest>;
export type UseEvmContractLogsQueryOptions = QueryOptions<GetContractLogsResponse, UseEvmContractLogsParams>;

export function useEvmContractLogs({ address, chain, blockNumber, fromBlock, toBlock, fromDate, toDate, topic0, limit, cursor }: UseEvmContractLogsParams = {}, queryOptions: UseEvmContractLogsQueryOptions = {}) {
  const resolver = usePaginatedOperationResolver(getContractLogsOperation, Moralis.EvmApi.baseUrl);

  const hasRequiredParams = useMemo(() => {
    return Boolean(address);
  }, [address]);

  const queryKey: [string, Partial<GetContractLogsRequest>] = useMemo(() => {
    return [
      getContractLogsOperation.id,
      {
        address, chain, blockNumber, fromBlock, toBlock, fromDate, toDate, topic0, limit, cursor
      },
    ];
  }, [address, chain, blockNumber, fromBlock, toBlock, fromDate, toDate, topic0, limit, cursor]);

  return useQuery({
    ...queryOptions,
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['address']);
      const response = await resolver.fetch(params);
      return response.result;
    },
    enabled: hasRequiredParams && queryOptions.enabled,
  });
}
