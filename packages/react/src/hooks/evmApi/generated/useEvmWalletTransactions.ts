import Moralis from 'moralis';
import { GetWalletTransactionsRequest, GetWalletTransactionsResponse, getWalletTransactionsOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { UseMoralisQueryParams } from '../../types';
import { usePaginatedOperationResolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseEvmWalletTransactionsParams = UseMoralisQueryParams<GetWalletTransactionsResponse, Partial<GetWalletTransactionsRequest>>

export function useEvmWalletTransactions({ address, chain, fromBlock, toBlock, fromDate, toDate, cursor, limit, disableTotal, ...queryParams }: UseEvmWalletTransactionsParams = {}) {
  const resolver = usePaginatedOperationResolver(getWalletTransactionsOperation, Moralis.EvmApi.baseUrl);

  const hasRequiredParams = useMemo(() => {
    return Boolean(address && address);
  }, [address , address]);

  const queryKey: [string, Partial<GetWalletTransactionsRequest>] = useMemo(() => {
    return [
      getWalletTransactionsOperation.id,
      {
        address, chain, fromBlock, toBlock, fromDate, toDate, cursor, limit, disableTotal
      },
    ];
  }, [address, chain, fromBlock, toBlock, fromDate, toDate, cursor, limit, disableTotal]);

  return useQuery({
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['address' , 'address']);
      const response = await resolver.fetch(params);
      return response.result;
    },
    ...queryParams,
    enabled: hasRequiredParams && queryParams.enabled,
  });
}