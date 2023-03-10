import Moralis from 'moralis';
import { GetTokenTransfersRequest, GetTokenTransfersResponse, getTokenTransfersOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { usePaginatedOperationResolver, useQuery } from '../../utils';

export type UseEvmTokenTransfersParams = UseMoralisQueryParams<GetTokenTransfersResponse, GetTokenTransfersRequest>

export function useEvmTokenTransfers({ address,chain,fromBlock,toBlock,fromDate,toDate,limit,cursor,disableTotal, ...queryParams }: UseEvmTokenTransfersParams = {}) {
  const resolver = usePaginatedOperationResolver(getTokenTransfersOperation, Moralis.EvmApi.baseUrl);

  const queryKey: [string, GetTokenTransfersRequest] | undefined = useMemo(() => {
    if (address ) {
      return [
      getTokenTransfersOperation.id,
      {
        address,chain,fromBlock,toBlock,fromDate,toDate,limit,cursor,disableTotal
      },
    ];
    }
      return;
  }, [address,chain,fromBlock,toBlock,fromDate,toDate,limit,cursor,disableTotal]);

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