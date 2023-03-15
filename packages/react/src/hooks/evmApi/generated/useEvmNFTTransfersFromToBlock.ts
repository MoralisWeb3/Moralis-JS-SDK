import Moralis from 'moralis';
import { GetNFTTransfersFromToBlockRequest, GetNFTTransfersFromToBlockResponse, getNFTTransfersFromToBlockOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { usePaginatedOperationResolver, useQuery } from '../../utils';


export type UseEvmNFTTransfersFromToBlockParams = GetNFTTransfersFromToBlockRequest;
export type UseEvmNFTTransfersFromToBlockQueryOptions = QueryOptions<GetNFTTransfersFromToBlockResponse, UseEvmNFTTransfersFromToBlockParams>;

export function useEvmNFTTransfersFromToBlock({ chain, fromBlock, toBlock, fromDate, toDate, format, limit, cursor, disableTotal }: UseEvmNFTTransfersFromToBlockParams = {}, queryOptions: UseEvmNFTTransfersFromToBlockQueryOptions = {}) {
  const resolver = usePaginatedOperationResolver(getNFTTransfersFromToBlockOperation, Moralis.EvmApi.baseUrl);


  const queryKey: [string, GetNFTTransfersFromToBlockRequest] = useMemo(() => {
    return [
      getNFTTransfersFromToBlockOperation.id,
      {
        chain, fromBlock, toBlock, fromDate, toDate, format, limit, cursor, disableTotal
      },
    ];
  }, [chain, fromBlock, toBlock, fromDate, toDate, format, limit, cursor, disableTotal]);

  return useQuery({
    ...queryOptions,
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const response = await resolver.fetch(request);
      return response.result;
    },
    enabled: queryOptions.enabled,
  });
}