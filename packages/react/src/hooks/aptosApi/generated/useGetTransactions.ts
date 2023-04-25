import { GetTransactionsOperationRequest, AptosGetTransactionsItemValue, GetTransactionsOperation } from 'moralis/common-aptos-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { useOperationV3Resolver, useQuery } from '../../utils';

export type UseGetTransactionsParams = GetTransactionsOperationRequest;
export type UseGetTransactionsQueryOptions = QueryOptions<AptosGetTransactionsItemValue[], UseGetTransactionsParams>;

export function useGetTransactions({ limit, start, network }: UseGetTransactionsParams = {},  queryOptions: UseGetTransactionsQueryOptions = {}) {
  const resolver = useOperationV3Resolver(GetTransactionsOperation);

  const queryKey: [string, GetTransactionsOperationRequest] = useMemo(() => {
    return [
      GetTransactionsOperation.operationId,
      {
        limit, start, network
      },
    ];
  }, [limit, start, network]);

  return useQuery({
    ...queryOptions,
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      return resolver.resolve(request, {});
    },
    enabled: queryOptions.enabled,
  });
}
