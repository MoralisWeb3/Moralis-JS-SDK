import Moralis from 'moralis';
import { GetNFTTradesRequest, GetNFTTradesResponse, getNFTTradesOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { usePaginatedOperationResolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseEvmNFTTradesParams = Partial<GetNFTTradesRequest>;
export type UseEvmNFTTradesQueryOptions = QueryOptions<GetNFTTradesResponse, UseEvmNFTTradesParams>;

export function useEvmNFTTrades({ address, chain, fromBlock, toBlock, fromDate, toDate, marketplace, cursor, limit, disableTotal }: UseEvmNFTTradesParams = {}, queryOptions: UseEvmNFTTradesQueryOptions = {}) {
  const resolver = usePaginatedOperationResolver(getNFTTradesOperation, Moralis.EvmApi.baseUrl);

  const hasRequiredParams = useMemo(() => {
    return Boolean(address);
  }, [address]);

  const queryKey: [string, Partial<GetNFTTradesRequest>] = useMemo(() => {
    return [
      getNFTTradesOperation.id,
      {
        address, chain, fromBlock, toBlock, fromDate, toDate, marketplace, cursor, limit, disableTotal
      },
    ];
  }, [address, chain, fromBlock, toBlock, fromDate, toDate, marketplace, cursor, limit, disableTotal]);

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