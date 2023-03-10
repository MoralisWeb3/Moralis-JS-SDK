import Moralis from 'moralis';
import { GetNFTTradesRequest, GetNFTTradesResponse, getNFTTradesOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { usePaginatedOperationResolver, useQuery } from '../../utils';

export type UseEvmNFTTradesParams = UseMoralisQueryParams<GetNFTTradesResponse, GetNFTTradesRequest>

export function useEvmNFTTrades({ address, chain, fromBlock, toBlock, fromDate, toDate, marketplace, cursor, limit, disableTotal, ...queryParams }: UseEvmNFTTradesParams = {}) {
  const resolver = usePaginatedOperationResolver(getNFTTradesOperation, Moralis.EvmApi.baseUrl);

  const queryKey: [string, GetNFTTradesRequest] | undefined = useMemo(() => {
    if (address) {
      return [
      getNFTTradesOperation.id,
      {
        address, chain, fromBlock, toBlock, fromDate, toDate, marketplace, cursor, limit, disableTotal
      },
    ];
    }
      return;
  }, [address, chain, fromBlock, toBlock, fromDate, toDate, marketplace, cursor, limit, disableTotal]);

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