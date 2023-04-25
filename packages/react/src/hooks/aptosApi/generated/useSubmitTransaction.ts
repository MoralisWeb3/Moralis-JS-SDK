import { SubmitTransactionOperationRequest, AptosPendingTransaction, AptosSubmitTransactionRequestInput, AptosSubmitTransactionRequest, SubmitTransactionOperation } from 'moralis/common-aptos-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { useOperationV3Resolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseSubmitTransactionParams = Partial<SubmitTransactionOperationRequest>;
export type UseSubmitTransactionQueryOptions = QueryOptions<AptosPendingTransaction, UseSubmitTransactionParams>;

export function useSubmitTransaction({ network }: UseSubmitTransactionParams = {}, body?: AptosSubmitTransactionRequestInput | AptosSubmitTransactionRequest, queryOptions: UseSubmitTransactionQueryOptions = {}) {
  const resolver = useOperationV3Resolver(SubmitTransactionOperation);

  const hasRequiredParams = useMemo(() => {
    return Boolean(body);
  }, [body]);

  const queryKey: [string, Partial<SubmitTransactionOperationRequest>] = useMemo(() => {
    return [
      SubmitTransactionOperation.operationId,
      {
        network
      },
    ];
  }, [network]);

  return useQuery({
    ...queryOptions,
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['body']);
      return resolver.resolve(params, body);
    },
    enabled: hasRequiredParams && queryOptions.enabled,
  });
}
