import { SimulateTransactionOperationRequest, AptosSimulateTransactionValue, AptosSubmitTransactionRequestInput, AptosSubmitTransactionRequest, SimulateTransactionOperation } from 'moralis/common-aptos-utils';
import { useMemo } from 'react';
import { QueryOptions } from '../../types';
import { useOperationV3Resolver, useQuery } from '../../utils';
import { validateParams } from '../../../utils/validateParams';

export type UseSimulateTransactionParams = Partial<SimulateTransactionOperationRequest>;
export type UseSimulateTransactionQueryOptions = QueryOptions<AptosSimulateTransactionValue, UseSimulateTransactionParams>;

export function useSimulateTransaction({ network }: UseSimulateTransactionParams = {}, body?: AptosSubmitTransactionRequestInput | AptosSubmitTransactionRequest, queryOptions: UseSimulateTransactionQueryOptions = {}) {
  const resolver = useOperationV3Resolver(SimulateTransactionOperation);

  const hasRequiredParams = useMemo(() => {
    return Boolean(body);
  }, [body]);

  const queryKey: [string, Partial<SimulateTransactionOperationRequest>] = useMemo(() => {
    return [
      SimulateTransactionOperation.operationId,
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
