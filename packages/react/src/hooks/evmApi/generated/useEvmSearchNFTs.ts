import Moralis from 'moralis';
import { SearchNFTsRequest, SearchNFTsResponse, searchNFTsOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { usePaginatedOperationResolver, useQuery } from '../../utils';

export type UseEvmSearchNFTsParams = UseMoralisQueryParams<SearchNFTsResponse, SearchNFTsRequest>

export function useEvmSearchNFTs({ chain, format, q, filter, fromBlock, toBlock, fromDate, toDate, addresses, cursor, limit, disableTotal, ...queryParams }: UseEvmSearchNFTsParams = {}) {
  const resolver = usePaginatedOperationResolver(searchNFTsOperation, Moralis.EvmApi.baseUrl);

  const queryKey: [string, SearchNFTsRequest] | undefined = useMemo(() => {
    if (q) {
      return [
      searchNFTsOperation.id,
      {
        chain, format, q, filter, fromBlock, toBlock, fromDate, toDate, addresses, cursor, limit, disableTotal
      },
    ];
    }
      return;
  }, [chain, format, q, filter, fromBlock, toBlock, fromDate, toDate, addresses, cursor, limit, disableTotal]);

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