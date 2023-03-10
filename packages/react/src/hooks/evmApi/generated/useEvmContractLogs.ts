import Moralis from 'moralis';
import { GetContractLogsRequest, GetContractLogsResponse, getContractLogsOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { usePaginatedOperationResolver, useQuery } from '../../utils';

export type UseEvmContractLogsParams = UseMoralisQueryParams<GetContractLogsResponse, GetContractLogsRequest>

export function useEvmContractLogs({ address, chain, blockNumber, fromBlock, toBlock, fromDate, toDate, topic0, topic1, topic2, topic3, limit, cursor, disableTotal, ...queryParams }: UseEvmContractLogsParams = {}) {
  const resolver = usePaginatedOperationResolver(getContractLogsOperation, Moralis.EvmApi.baseUrl);

  const queryKey: [string, GetContractLogsRequest] | undefined = useMemo(() => {
    if (address) {
      return [
      getContractLogsOperation.id,
      {
        address, chain, blockNumber, fromBlock, toBlock, fromDate, toDate, topic0, topic1, topic2, topic3, limit, cursor, disableTotal
      },
    ];
    }
      return;
  }, [address, chain, blockNumber, fromBlock, toBlock, fromDate, toDate, topic0, topic1, topic2, topic3, limit, cursor, disableTotal]);

  return useQuery({
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const response = await resolver.fetch(request);
      return response.result;
    },
    ...queryParams,
    enabled: queryKey && queryParams.enabled,
  });
}