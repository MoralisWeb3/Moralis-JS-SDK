import { GetAccountTransactionsOperationRequest, AptosGetAccountTransactionsItemValue, GetAccountTransactionsOperation } from 'moralis/common-aptos-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { useOperationV3Resolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseGetAccountTransactionsParams = Partial<GetAccountTransactionsOperationRequest>;
export type UseGetAccountTransactionsQueryOptions = QueryOptions<AptosGetAccountTransactionsItemValue[], UseGetAccountTransactionsParams>;

export function useGetAccountTransactions({ address, limit, start, network }: UseGetAccountTransactionsParams = {},  queryOptions: UseGetAccountTransactionsQueryOptions = {}) {
  const resolver = useOperationV3Resolver(GetAccountTransactionsOperation);

  const hasRequiredParams = useMemo(() => {
    return Boolean(address);
  }, [address]);

  const queryKey: [string, Partial<GetAccountTransactionsOperationRequest>] = useMemo(() => {
    return [
      GetAccountTransactionsOperation.operationId,
      {
        address, limit, start, network
      },
    ];
  }, [address, limit, start, network]);

  return useQuery({
    ...queryOptions,
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['address']);
      return resolver.resolve(params, {});
    },
    enabled: hasRequiredParams && queryOptions.enabled,
  });
}
