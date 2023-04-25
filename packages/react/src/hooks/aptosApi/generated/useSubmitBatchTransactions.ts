import { SubmitBatchTransactionsOperationRequest, AptosSubmitBatchTransactionResult, AptosSubmitTransactionRequestInput[], AptosSubmitTransactionRequest[], SubmitBatchTransactionsOperation } from 'moralis/common-aptos-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { useOperationV3Resolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseSubmitBatchTransactionsParams = Partial<SubmitBatchTransactionsOperationRequest>;
export type UseSubmitBatchTransactionsQueryOptions = QueryOptions<AptosSubmitBatchTransactionResult, UseSubmitBatchTransactionsParams>;

export function useSubmitBatchTransactions({ network }: UseSubmitBatchTransactionsParams = {}, body?: AptosSubmitTransactionRequestInput[] | AptosSubmitTransactionRequest[], queryOptions: UseSubmitBatchTransactionsQueryOptions = {}) {
  const resolver = useOperationV3Resolver(SubmitBatchTransactionsOperation);

  const hasRequiredParams = useMemo(() => {
    return Boolean(body);
  }, [body]);

  const queryKey: [string, Partial<SubmitBatchTransactionsOperationRequest>] = useMemo(() => {
    return [
      SubmitBatchTransactionsOperation.operationId,
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
