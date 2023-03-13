import Moralis from 'moralis';
import { GetContractEventsRequest, GetContractEventsResponse, getContractEventsOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { usePaginatedOperationResolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseEvmContractEventsParams = UseMoralisQueryParams<GetContractEventsResponse, Partial<GetContractEventsRequest>>

export function useEvmContractEvents({ address, abi, chain, fromBlock, toBlock, fromDate, toDate, topic, offset, limit, disableTotal, ...queryParams }: UseEvmContractEventsParams = {}) {
  const resolver = usePaginatedOperationResolver(getContractEventsOperation, Moralis.EvmApi.baseUrl);

  const hasRequiredParams = useMemo(() => {
    return Boolean(address && abi && topic);
  }, [address , abi , topic]);

  const queryKey: [string, Partial<GetContractEventsRequest>] = useMemo(() => {
    return [
      getContractEventsOperation.id,
      {
        address, abi, chain, fromBlock, toBlock, fromDate, toDate, topic, offset, limit, disableTotal
      },
    ];
  }, [address, abi, chain, fromBlock, toBlock, fromDate, toDate, topic, offset, limit, disableTotal]);

  return useQuery({
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['address', 'abi', 'topic']);
      const response = await resolver.fetch(params);
      return response.result;
    },
    ...queryParams,
    enabled: hasRequiredParams && queryParams.enabled,
  });
}