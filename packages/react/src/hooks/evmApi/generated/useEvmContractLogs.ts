import Moralis from 'moralis';
import { GetContractLogsRequest, GetContractLogsResponse, getContractLogsOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { usePaginatedOperationResolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseEvmContractLogsParams = UseMoralisQueryParams<GetContractLogsResponse, Partial<GetContractLogsRequest>>

export function useEvmContractLogs({ address, chain, blockNumber, fromBlock, toBlock, fromDate, toDate, topic0, topic1, topic2, topic3, limit, cursor, disableTotal, ...queryParams }: UseEvmContractLogsParams = {}) {
  const resolver = usePaginatedOperationResolver(getContractLogsOperation, Moralis.EvmApi.baseUrl);

  const hasRequiredParams = useMemo(() => {
    return Boolean(address);
  }, [address]);

  const queryKey: [string, Partial<GetContractLogsRequest>] = useMemo(() => {
    return [
      getContractLogsOperation.id,
      {
        address, chain, blockNumber, fromBlock, toBlock, fromDate, toDate, topic0, topic1, topic2, topic3, limit, cursor, disableTotal
      },
    ];
  }, [address, chain, blockNumber, fromBlock, toBlock, fromDate, toDate, topic0, topic1, topic2, topic3, limit, cursor, disableTotal]);

  return useQuery({
    ...queryParams,
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['address']);
      const response = await resolver.fetch(params);
      return response.result;
    },
    enabled: hasRequiredParams && queryParams.enabled,
  });
}