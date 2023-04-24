import { AptosGetAccountResponse, GetAccountOperation, GetAccountOperationRequest } from 'moralis/common-aptos-utils';
import { useMemo } from 'react';
import { validateParams } from '../../../utils/validateParams';
import { QueryOptions } from '../../types';
import { useQuery } from '../../utils';
import { useOperationV3Resolver } from '../../utils/resolvers/useOperationV3Resolver';

export type UseAptosGetAccountParams = Partial<GetAccountOperationRequest>;
export type UseAptosGetAccountQueryOptions = QueryOptions<AptosGetAccountResponse, UseAptosGetAccountParams>;

export function useAptosGetAccount({ address, ledgerVersion, network }: UseAptosGetAccountParams = {}, queryOptions: UseAptosGetAccountQueryOptions = {}) {
  const resolver = useOperationV3Resolver();

  const hasRequiredParams = useMemo(() => {
    return Boolean(address);
  }, [address]);

  const queryKey: [string, Partial<GetAccountOperationRequest>] = useMemo(() => {
    return [
      GetAccountOperation.operationId,
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
      const response = await resolver.resolve(params, null, GetAccountOperation);
      return response;
    },
    enabled: hasRequiredParams && queryOptions.enabled,
  });
}