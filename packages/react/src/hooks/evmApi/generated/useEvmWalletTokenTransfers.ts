import Moralis from 'moralis';
import { GetWalletTokenTransfersRequest, GetWalletTokenTransfersResponse, getWalletTokenTransfersOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { usePaginatedOperationResolver, useQuery } from '../../utils';

export type UseEvmWalletTokenTransfersParams = UseMoralisQueryParams<GetWalletTokenTransfersResponse, GetWalletTokenTransfersRequest>

export function useEvmWalletTokenTransfers({ address,chain,fromBlock,toBlock,fromDate,toDate,limit,cursor,disableTotal, ...queryParams }: UseEvmWalletTokenTransfersParams = {}) {
  const resolver = usePaginatedOperationResolver(getWalletTokenTransfersOperation, Moralis.EvmApi.baseUrl);

  const queryKey: [string, GetWalletTokenTransfersRequest] | undefined = useMemo(() => {
    if (address ) {
      return [
      getWalletTokenTransfersOperation.id,
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