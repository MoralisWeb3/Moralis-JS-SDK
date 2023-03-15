import Moralis from 'moralis';
import { GetWalletTransactionsRequest, GetWalletTransactionsResponse, getWalletTransactionsOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { usePaginatedOperationResolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseEvmWalletTransactionsParams = Partial<GetWalletTransactionsRequest>;
export type UseEvmWalletTransactionsQueryOptions = QueryOptions<GetWalletTransactionsResponse, UseEvmWalletTransactionsParams>;

export function useEvmWalletTransactions({ address, chain, fromBlock, toBlock, fromDate, toDate, cursor, limit, disableTotal }: UseEvmWalletTransactionsParams = {}, queryOptions: UseEvmWalletTransactionsQueryOptions = {}) {
  const resolver = usePaginatedOperationResolver(getWalletTransactionsOperation, Moralis.EvmApi.baseUrl);

  const hasRequiredParams = useMemo(() => {
    return Boolean(address);
  }, [address]);

  const queryKey: [string, Partial<GetWalletTransactionsRequest>] = useMemo(() => {
    return [
      getWalletTransactionsOperation.id,
      {
        address, chain, fromBlock, toBlock, fromDate, toDate, cursor, limit, disableTotal
      },
    ];
  }, [address, chain, fromBlock, toBlock, fromDate, toDate, cursor, limit, disableTotal]);

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