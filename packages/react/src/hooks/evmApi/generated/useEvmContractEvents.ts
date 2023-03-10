import Moralis from 'moralis';
import { GetContractEventsRequest, GetContractEventsResponse, getContractEventsOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { usePaginatedOperationResolver, useQuery } from '../../utils';

export type UseEvmContractEventsParams = UseMoralisQueryParams<GetContractEventsResponse, GetContractEventsRequest>

export function useEvmContractEvents({ address, abi, chain, fromBlock, toBlock, fromDate, toDate, topic, offset, limit, disableTotal, ...queryParams }: UseEvmContractEventsParams = {}) {
  const resolver = usePaginatedOperationResolver(getContractEventsOperation, Moralis.EvmApi.baseUrl);

  const queryKey: [string, GetContractEventsRequest] | undefined = useMemo(() => {
    if (topic && address) {
      return [
      getContractEventsOperation.id,
      {
        address, abi, chain, fromBlock, toBlock, fromDate, toDate, topic, offset, limit, disableTotal
      },
    ];
    }
      return;
  }, [address, abi, chain, fromBlock, toBlock, fromDate, toDate, topic, offset, limit, disableTotal]);

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