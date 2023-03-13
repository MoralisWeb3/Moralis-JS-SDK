import Moralis from 'moralis';
import { SearchNFTsRequest, SearchNFTsResponse, searchNFTsOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { usePaginatedOperationResolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseEvmSearchNFTsParams = UseMoralisQueryParams<SearchNFTsResponse, Partial<SearchNFTsRequest>>

export function useEvmSearchNFTs({ chain, format, q, filter, fromBlock, toBlock, fromDate, toDate, addresses, cursor, limit, disableTotal, ...queryParams }: UseEvmSearchNFTsParams = {}) {
  const resolver = usePaginatedOperationResolver(searchNFTsOperation, Moralis.EvmApi.baseUrl);

  const hasRequiredParams = useMemo(() => {
    return Boolean(q);
  }, [q]);

  const queryKey: [string, Partial<SearchNFTsRequest>] = useMemo(() => {
    return [
      searchNFTsOperation.id,
      {
        chain, format, q, filter, fromBlock, toBlock, fromDate, toDate, addresses, cursor, limit, disableTotal
      },
    ];
  }, [chain, format, q, filter, fromBlock, toBlock, fromDate, toDate, addresses, cursor, limit, disableTotal]);

  return useQuery({
    ...queryParams,
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['q']);
      const response = await resolver.fetch(params);
      return response.result;
    },
    enabled: hasRequiredParams && queryParams.enabled,
  });
}