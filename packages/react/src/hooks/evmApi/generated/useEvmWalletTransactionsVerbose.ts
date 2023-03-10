import Moralis from 'moralis';
import { GetWalletTransactionsVerboseRequest, GetWalletTransactionsVerboseResponse, getWalletTransactionsVerboseOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { usePaginatedOperationResolver, useQuery } from '../../utils';

export type UseEvmWalletTransactionsVerboseParams = UseMoralisQueryParams<GetWalletTransactionsVerboseResponse, GetWalletTransactionsVerboseRequest>

export function useEvmWalletTransactionsVerbose({ address,chain,fromBlock,toBlock,fromDate,toDate,cursor,limit,disableTotal, ...queryParams }: UseEvmWalletTransactionsVerboseParams = {}) {
  const resolver = usePaginatedOperationResolver(getWalletTransactionsVerboseOperation, Moralis.EvmApi.baseUrl);

  const queryKey: [string, GetWalletTransactionsVerboseRequest] | undefined = useMemo(() => {
    if (address ) {
      return [
      getWalletTransactionsVerboseOperation.id,
      {
        address,chain,fromBlock,toBlock,fromDate,toDate,cursor,limit,disableTotal
      },
    ];
    }
      return;
  }, [address,chain,fromBlock,toBlock,fromDate,toDate,cursor,limit,disableTotal]);

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