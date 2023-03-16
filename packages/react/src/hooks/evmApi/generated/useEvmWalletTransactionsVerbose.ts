import Moralis from 'moralis';
import { GetWalletTransactionsVerboseRequest, GetWalletTransactionsVerboseResponse, getWalletTransactionsVerboseOperation } from 'moralis/common-evm-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { usePaginatedOperationResolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseEvmWalletTransactionsVerboseParams = Partial<GetWalletTransactionsVerboseRequest>;
export type UseEvmWalletTransactionsVerboseQueryOptions = QueryOptions<GetWalletTransactionsVerboseResponse, UseEvmWalletTransactionsVerboseParams>;

export function useEvmWalletTransactionsVerbose({ address, chain, fromBlock, toBlock, fromDate, toDate, cursor, limit, disableTotal }: UseEvmWalletTransactionsVerboseParams = {}, queryOptions: UseEvmWalletTransactionsVerboseQueryOptions = {}) {
  const resolver = usePaginatedOperationResolver(getWalletTransactionsVerboseOperation, Moralis.EvmApi.baseUrl);

  const hasRequiredParams = useMemo(() => {
    return Boolean(address);
  }, [address]);

  const queryKey: [string, Partial<GetWalletTransactionsVerboseRequest>] = useMemo(() => {
    return [
      getWalletTransactionsVerboseOperation.id,
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