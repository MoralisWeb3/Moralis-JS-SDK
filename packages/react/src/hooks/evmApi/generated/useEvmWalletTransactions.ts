import Moralis from 'moralis';
import { GetWalletTransactionsRequest, GetWalletTransactionsResponse, getWalletTransactionsOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { usePaginatedOperationResolver, useQuery } from '../../utils';

export type UseEvmWalletTransactionsParams = UseMoralisQueryParams<GetWalletTransactionsResponse, GetWalletTransactionsRequest>

export function useEvmWalletTransactions({ address,chain,fromBlock,toBlock,fromDate,toDate,cursor,limit,disableTotal, ...queryParams }: UseEvmWalletTransactionsParams = {}) {
  const resolver = usePaginatedOperationResolver(getWalletTransactionsOperation, Moralis.EvmApi.baseUrl);

  const queryKey: [string, GetWalletTransactionsRequest] | undefined = useMemo(() => {
    if (address ) {
      return [
      getWalletTransactionsOperation.id,
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
      const { result } = await resolver.fetch(request);
      return result;
    },
    ...queryParams,
    enabled: queryKey && queryParams.enabled,
  });
}