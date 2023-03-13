import Moralis from 'moralis';
import { GetNFTTransfersFromToBlockRequest, GetNFTTransfersFromToBlockResponse, getNFTTransfersFromToBlockOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { usePaginatedOperationResolver, useQuery } from '../../utils';


export type UseEvmNFTTransfersFromToBlockParams = UseMoralisQueryParams<GetNFTTransfersFromToBlockResponse, GetNFTTransfersFromToBlockRequest>

export function useEvmNFTTransfersFromToBlock({ chain, fromBlock, toBlock, fromDate, toDate, format, limit, cursor, disableTotal, ...queryParams }: UseEvmNFTTransfersFromToBlockParams = {}) {
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
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const response = await resolver.fetch(request);
      return response.result;
    },
    ...queryParams,
    enabled: queryParams.enabled,
  });
}