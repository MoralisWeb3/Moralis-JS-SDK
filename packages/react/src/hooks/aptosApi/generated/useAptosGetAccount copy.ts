import { SimulateTransactionResponse, SimulateTransactionOperation, SimulateTransactionOperationRequest } from 'moralis/common-aptos-utils';
import { useMemo } from 'react';
import { validateParams } from '../../../utils/validateParams';
import { QueryOptions } from '../../types';
import { useQuery } from '../../utils';
import { useOperationV3Resolver } from '../../utils/resolvers/useOperationV3Resolver';

export type UseAptosSimulateTransactionParams = Partial<SimulateTransactionOperationRequest>;
export type UseAptosSimulateTransactionQueryOptions = QueryOptions<SimulateTransactionResponse, UseAptosSimulateTransactionParams>;

export function useAptosSimulateTransaction({ address, ledgerVersion, network }: UseAptosSimulateTransactionParams = {}, queryOptions: UseAptosSimulateTransactionQueryOptions = {}) {
  const resolver = useOperationV3Resolver();

  const hasRequiredParams = useMemo(() => {
    return Boolean(address);
  }, [address]);

  const queryKey: [string, Partial<SimulateTransactionOperationRequest>] = useMemo(() => {
    return [
      SimulateTransactionOperation.operationId,
      {
        address, ledgerVersion, network
      },
    ];
  }, [address, ledgerVersion, network]);

  return useQuery({
    ...queryOptions,
    queryKey,
    queryFn: async ({ queryKey: [_id, request] }) => {
      const params = validateParams(request, ['address']);
      const response = await resolver.resolve(params, null, SimulateTransactionOperation);
      return response;
    },
    enabled: hasRequiredParams && queryOptions.enabled,
  });
}